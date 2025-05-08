import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IProjectsRepository from "../plugins/projects.repository.plugin";
import Project from "../entities/project";
import IProjectsPresenter from "../plugins/projects.presenter.plugin";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadProjectsInput, LoadProjectsOutput } from "./types/load-projects.type";
import ProjectsNotLoadedError from "../errors/projects-not-loaded.error";

@injectable()
export default class LoadPresentProjectsUseCase extends BaseUseCase<LoadProjectsInput, LoadProjectsOutput>
{
  constructor(
    @inject(TYPES.ProjectsRepository)
    private readonly _projectsRepository: IProjectsRepository,

    @inject(TYPES.ProjectsPresenter)
    private readonly _presenter: IProjectsPresenter
  ) {
    super();
  }

  public async execute(): Promise<LoadProjectsOutput> {
    const result = await this._projectsRepository.loadProjects();
    if (!result.hasData()) {
      return Result.failure<void>(new ProjectsNotLoadedError());
    }

    const projects = result.data.map(Project.fromDto);
    this._projectsRepository.storeProjects(projects);
    this._presenter.presentProjects(projects);

    return Result.success<void>();
  }
}
