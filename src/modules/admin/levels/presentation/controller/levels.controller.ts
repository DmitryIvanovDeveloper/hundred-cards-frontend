import { inject } from "inversify"
import { TYPES } from "../../types"
import SelectLevelUseCase from "../../business/usecases/select-level.usecase"
import CreateLevelUseCase from "../../business/usecases/create-level.usecase"
import Result from "@/infrastructure/helpers/result"

export default class LevelsController  {
    constructor(
        @inject(TYPES.SelectLevelUseCase)
        private readonly _selectLevelUseCase: SelectLevelUseCase,

        @inject(TYPES.CreateLevelUseCase)
        private readonly _createLevelUseCase: CreateLevelUseCase

    ){}  

    public createLevel = async (): Promise<Result<void>> => {
        return await this._createLevelUseCase.execute({ name: 'Новая категория'});
    }

    public selectLevel = async (levelId: string): Promise<Result<void>> => {
        return await this._selectLevelUseCase.execute({ levelId: levelId });
    }
} 