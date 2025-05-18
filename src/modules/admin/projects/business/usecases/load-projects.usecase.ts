import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES} from "@/infrastructure/bootstrap/types";
import IProjectsHttpRepository from "../plugins/projects.http.repository.plugin";
import Project from "../entities/project";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadProjectsInput, LoadProjectsOutput } from "./types/load-projects.type";
import ProjectsNotLoadedError from "../errors/projects-not-loaded.error";
import IProjectsLocalRepository from "../plugins/projects.local.repository.plugin";
import SelectProjectUseCase from "./select-project.usecase";

@injectable()
export default class LoadProjectsUseCase extends BaseUseCase<LoadProjectsInput, LoadProjectsOutput> {
	constructor(
		@inject(TYPES.ProjectsHttpRepository)
		private readonly _projectsRepository: IProjectsHttpRepository,

		@inject(TYPES.ProjectsLocalRepository)
		private readonly _localRepository: IProjectsLocalRepository,

		@inject(TYPES.SelectProjectUseCase)
		private readonly _selectProjectUseCase: SelectProjectUseCase,
	) {
		super();
	}

	public async execute(): Promise<LoadProjectsOutput> {

		const result = await this._projectsRepository.loadProjects();
		if (!result.hasData()) {
			return Result.failure<void>(new ProjectsNotLoadedError());
		}

		const projects = result.data.map(Project.toEntity);
		this._localRepository.storeProjects(projects);

		if (!!projects.length) {
			this._selectProjectUseCase.execute({ projectId: projects[0].id });
		}

		return Result.success<void>();
	}
}
