import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import ILevelsRepository from "../plugins/levels.repository.plugin";
import ILevelsPresenter from "../plugins/levels.presenter.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadLevelInput, LoadLevelOutput } from "./types/load-levels.type";
import LevelsNotLoadedrror from "../errors/level-not-loaded.error";
import InitializeLevelsUseCase from "./initialize-levels.usecase";
import SelectLevelUseCase from "./select-level.usecase";

@injectable()
export default class LoadPresentLevelsUseCase extends BaseUseCase<LoadLevelInput, LoadLevelOutput>{
    constructor(
        @inject(TYPES.LevelsRepository)
        private readonly _repository: ILevelsRepository,

        @inject(TYPES.LevelsPresenter)
        private readonly _presenter: ILevelsPresenter,

        @inject(TYPES.InitializeLevelsUseCase)
        private readonly _initializeLevelsUseCase: InitializeLevelsUseCase,
    ) {
        super()
    }

    public execute = async (projectId: string): Promise<LoadLevelOutput> => {
        const result = await this._repository.loadLevels(projectId);
        if (!result.hasData()) {
            return Result.failure(new LevelsNotLoadedrror());
        }

       this._initializeLevelsUseCase.execute({levelResponse: result.data});

        return Result.success();
    }
}