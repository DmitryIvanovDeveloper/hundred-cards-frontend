import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import ILevelsRepository from "../plugins/levels.repository.plugin";
import ILevelsPresenter from "../plugins/levels.presenter.plugin";
import Level from "../entities/level";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadLevelOutput } from "./types/load-levels.type";
import { InitializeLevelInput, InitializeLevelOutput } from "./types/initialize-level.type";
import SelectLevelUseCase from "./select-level.usecase";

@injectable()
export default class InitializeLevelsUseCase extends BaseUseCase<InitializeLevelInput, InitializeLevelOutput>{
    constructor(
        @inject(TYPES.LevelsRepository)
        private readonly _repository: ILevelsRepository,

        @inject(TYPES.LevelsPresenter)
        private readonly _presenter: ILevelsPresenter,

        @inject(TYPES.SelectLevelUseCase)
        private readonly _selectLevelUseCase: SelectLevelUseCase,
    ) {
        super()
    }

    public execute = async (input: InitializeLevelInput): Promise<LoadLevelOutput> => {

        const levels = input.levelResponse.map(dto => Level.fromResponseDto(dto))
        this._repository.storeLevels(levels);
        this._presenter.presentLevels(levels);

        this._selectLevelUseCase.execute({ levelId: levels[0].id });
        return Result.success();
    }
}