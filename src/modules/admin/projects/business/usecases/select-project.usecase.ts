import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import IProjectsRepository from "../plugins/projects.repository.plugin";
import IProjectsPresenter from "../plugins/projects.presenter.plugin";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { SelectProjectInput, SelectProjectOutput } from "./types/select-project.type";
import ProjectNotSelectedError from "../errors/project-not-selected.error";

@injectable()
export default class SelectProjectUseCase extends BaseUseCase<SelectProjectInput, SelectProjectOutput>
{
  constructor(
    @inject(TYPES.ProjectsRepository)
    private readonly _projectsRepository: IProjectsRepository,

    @inject(TYPES.ProjectsPresenter)
    private readonly _presenter: IProjectsPresenter
  ) {
    super();
  }

  public async execute(input: SelectProjectInput): Promise<SelectProjectOutput> {
    const result = await this._projectsRepository.findProjectById(input.projectId);
    console.log(result)
    if (!result.hasData()) {
        return Result.failure<void>(new ProjectNotSelectedError(input.projectId));
    }

    const project = result.data;
    this._projectsRepository.storeProject(project);
    this._presenter.presentProject(project);

    return Result.success<void>();
  }
}
