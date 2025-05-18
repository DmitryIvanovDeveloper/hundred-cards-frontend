import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@infrastructure/bootstrap/types";
import CreateProjectUseCase from "../../business/usecases/create-project.usecase";
import { ref } from "vue";
import Result from "@/infrastructure/helpers/result";
import SelectProjectUseCase from "../../business/usecases/select-project.usecase";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import SaveProjectEvent from "../../business/events/save-project-event";
import NextQuestionEvent from "@/modules/admin/questions/business/events/next-question-event";
import PreviouseQuestionEvent from "@/modules/admin/questions/business/events/previous-question-event";
import IProjectsLocalRepository from "../../business/plugins/projects.local.repository.plugin";
import DeleteProjectUseCase from "../../business/usecases/delete-project.usecase";

@injectable()
export default class ProjectsController {
    
    constructor(
        @inject(TYPES.CreateProjectPresentConstructorUseCase)
        private readonly _createNewProjectUseCase: CreateProjectUseCase,

        @inject(TYPES.SelectProjectUseCase)
        private readonly _selectProjectUseCae: SelectProjectUseCase,

        @inject(TYPES.DeleteProjectUseCase)
        private readonly _deleteProjectUseCase: DeleteProjectUseCase,

        @inject(TYPES.ProjectsLocalRepository)
        private readonly _repoitory: IProjectsLocalRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus,
    ) {}

    public loading = ref<boolean>(false);
    public isEdit = ref<boolean>(false);

    public createProject = async (): Promise<Result<void>> => {
        this.loading.value = true;
        const result = await this._createNewProjectUseCase.execute({name: 'Новый проект'});
        this.loading.value = false;
        return result;
    };

    public selectProject = async (projectId: string): Promise<Result<void>> => {
        this.loading.value = true;
        const result = await this._selectProjectUseCae.execute({ projectId: projectId });
        this.loading.value = false;
        return result;
    };

    public saveProject = async (): Promise<void> => {
        this.loading.value = true;
        await this._eventBus.publishAsync(new SaveProjectEvent())
        this.loading.value = false;
    }

    public nextQuestion = (): void => {
        this._eventBus.publish(new NextQuestionEvent());
    }
    
    public previousQuestion = (): void => {
        this._eventBus.publish(new PreviouseQuestionEvent());
    }

    public updateName = (name: string): void => {
        const project = this._repoitory.getProject().value;
        if (!project) {
            return;
        }

        const updatedProject = project.withUpdatedName(name);
        this._repoitory.updateProjects(updatedProject);
    }

    public edit = (edit: boolean): void => {
        this.isEdit.value = edit;
    }

    public async deleteProject(id: string): Promise<Result<void>> {
        return await this._deleteProjectUseCase.execute({ projectId: id} );
    }
}
