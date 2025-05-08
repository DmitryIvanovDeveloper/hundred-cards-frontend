import Result from "@/infrastructure/helpers/result";
import ILevelsService from "../plugins/levels.service.plugin";
import { inject } from "inversify";
import { TYPES } from "../../types";
import ILevelsRepository from "../plugins/levels.repository.plugin";

export default class LevelService implements ILevelsService {

    constructor(
        @inject(TYPES.LevelsRepository)
        private readonly _repository: ILevelsRepository
    ){}

    getSelectedLevelId(): Result<string> {
        const result = this._repository.getLevel();
        if (!result.hasData()) {
            return Result.failure();
        }

        return Result.success(result.data.id);
    }

}