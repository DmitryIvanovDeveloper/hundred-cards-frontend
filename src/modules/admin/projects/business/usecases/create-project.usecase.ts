import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IProjectsRepository from "../plugins/projects.http.repository.plugin";
import Project from "../entities/project";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { CreateProjectInput, CreateProjectOutput} from "./types/create-project.type";
import ProjectNotCreatedError from "../errors/project-not-created.error";
import IProjectsLocalRepository from "../plugins/projects.local.repository.plugin";
import SelectProjectUseCase from "./select-project.usecase";

@injectable()
export default class CreateProjectUseCase extends BaseUseCase<CreateProjectInput, CreateProjectOutput> {
    constructor(
        @inject(TYPES.ProjectsHttpRepository)
        private readonly _projectsRepository: IProjectsRepository,

        @inject(TYPES.ProjectsLocalRepository)
        private readonly _localRepository: IProjectsLocalRepository,

        @inject(TYPES.SelectProjectUseCase)
    private readonly _selectProjectUseCase: SelectProjectUseCase,
    ) {
        super()
    }

    public execute = async (input: CreateProjectInput): Promise<CreateProjectOutput> => {
        const newProject = Project.toRequestDto(input);

        const result = await this._projectsRepository.createProject(newProject);
        if (!result.hasData()) {
            return Result.failure(new ProjectNotCreatedError());
        }

        const project = Project.toEntity(result.data);
        this._localRepository.addProject(project);
        
        this._selectProjectUseCase.execute({ projectId: project.id });
        return Result.success();
    }
}