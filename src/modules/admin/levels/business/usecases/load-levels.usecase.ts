import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadLevelInput, LoadLevelOutput } from "./types/load-levels.type";
import LevelsNotLoadedError from "../errors/level-not-loaded.error";
import ILevelsHttpRepository from "../plugins/levels.http.repository.plugin";
import Level from "../entities/level";
import ILevelsLocalRepository from "../plugins/levels.local.repository.plugin";
import SelectLevelUseCase from "./select-level.usecase";

@injectable()
export default class LoadLevelsUseCase extends BaseUseCase<LoadLevelInput, LoadLevelOutput>{
    constructor(
        @inject(TYPES.LevelsHttpRepository)
        private readonly _repository: ILevelsHttpRepository,

        @inject(TYPES.LevelsLocalRepository)
        private readonly _localRepository: ILevelsLocalRepository,

        @inject(TYPES.SelectLevelUseCase)
        private readonly _selectLevelUseCase: SelectLevelUseCase,
    ) {
        super()
    }

    public execute = async (projectId: string): Promise<LoadLevelOutput> => {
        const result = await this._repository.loadLevels(projectId);
        if (!result.hasData()) {
            return Result.failure(new LevelsNotLoadedError());
        }

        const levels = result.data.map(dto => Level.toEntity(dto));
        this._localRepository.storeLevels(levels);

        this._selectLevelUseCase.execute( { levelId: levels[0].id })
        return Result.success();
    }
}