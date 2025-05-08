import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import CreatePresentProjectUseCase from "../../business/usecases/create-present-project.usecase";
import { ref } from "vue";
import Result from "@/infrastructure/helpers/result";
import SelectProjectUseCase from "../../business/usecases/select-project.usecase";

@injectable()
export default class ProjectsController {
    constructor(
        @inject(TYPES.CreateProjectPresentConstructorUseCase)
        private readonly _createNewProjectUseCase: CreatePresentProjectUseCase,

        @inject(TYPES.SelectProjectUseCase)
        private readonly _selectProjectUseCae: SelectProjectUseCase
    ) {}

    public loading = ref<boolean>(false);

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
}
