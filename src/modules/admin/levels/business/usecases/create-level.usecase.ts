import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import { TYPES as ProjectTYPES } from "@/modules/admin/projects/types";
import Result from "@/infrastructure/helpers/result";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import ILevelsRepository from "../plugins/levels.repository.plugin";
import ILevelsPresenter from "../plugins/levels.presenter.plugin";
import Level from "../entities/level";
import IProjectsService from "@/modules/admin/projects/business/plugins/projects.service.plugin";
import LevelNotCreatedError from "../errors/level-not-created.error";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { CreateLevelInput, CreateLevelOutput } from "./types/create-level.type";
import LevelSelectedEvent from "../events/level-selected-event";

@injectable()
export default class CreateLevelUseCase extends BaseUseCase<
  CreateLevelInput,
  CreateLevelOutput
> {
  constructor(
    @inject(TYPES.LevelsRepository)
    private readonly _repository: ILevelsRepository,

    @inject(TYPES.LevelsPresenter)
    private readonly _presenter: ILevelsPresenter,

    @inject(SharedTYPES.EventBus)
    private readonly _eventBus: IEventBus,

    @inject(ProjectTYPES.ProjectsService)
    private readonly _projectsService: IProjectsService
  ) {
    super();
  }

  public async execute(input: CreateLevelInput): Promise<CreateLevelOutput> {
    const { name } = input;

    const projectResult = this._projectsService.getSelectedProjectId();
    if (!projectResult.hasData()) {
      return Result.failure(new LevelNotCreatedError());
    }

    const projectId = projectResult.data;
    const levelEntity = Level.create(name, "RU", projectId);
    const result = await this._repository.createLevel(
      levelEntity.toCreateDto()
    );

    if (!result.hasData()) {
      return Result.failure(new LevelNotCreatedError());
    }

    const level = Level.fromResponseDto(result.data);
    this._repository.storeLevel(level);
    this._presenter.presentLevel(level);

    await this._eventBus.publishAsync(new LevelSelectedEvent(level.id));
    return Result.success();
  }
}
