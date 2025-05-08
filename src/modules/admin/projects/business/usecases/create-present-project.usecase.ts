import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import IProjectsRepository from "../plugins/projects.repository.plugin";
import Project from "../entities/project";
import IProjectsPresenter from "../plugins/projects.presenter.plugin";
import Result from "@/infrastructure/helpers/result";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import ProjectSelectedEvent from "../events/project-selected-event";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { CreateProjectInput, CreateProjectOutput} from "./types/create-project.type";
import ProjectNotCreatedError from "../errors/project-not-created.error";

@injectable()
export default class CreatePresentProjectUseCase extends BaseUseCase<CreateProjectInput, CreateProjectOutput> {
    constructor(
        @inject(TYPES.ProjectsRepository)
        private readonly _projectsRepository: IProjectsRepository,

        @inject(TYPES.ProjectsPresenter)
        private readonly _presenter: IProjectsPresenter,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus
    ) {
        super()
    }

    public execute = async (input: CreateProjectInput): Promise<CreateProjectOutput> => {
        const newProject = Project.toRequestDto(input);

        const result = await this._projectsRepository.createProject(newProject);
        if (!result.hasData()) {
            return Result.failure(new ProjectNotCreatedError());
        }

        const project = Project.fromDto(result.data);
        this._projectsRepository.storeProject(project);
        this._presenter.presentProject(project);

        await this._eventBus.publishAsync(new ProjectSelectedEvent(project.id));
        return Result.success();
    }
}