import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { DeleteLevelInput, DeleteLevelOutput } from "./types/create-level.type";
import ILevelsLocalRepository from "../plugins/levels.local.repository.plugin";

@injectable()
export default class DeleteLevelLocalUseCase extends BaseUseCase<DeleteLevelInput, DeleteLevelOutput> {
    constructor(
        @inject(TYPES.LevelsLocalRepository)
        private readonly _localRepository: ILevelsLocalRepository,
    ) {
        super();
    }

    public async execute(input: DeleteLevelInput): Promise<DeleteLevelOutput> {
        const levelId = input.levelId;
        const levels = this._localRepository.getLevels().value;
        const filtredLevels = levels.filter(level => level.id !== levelId);
        this._localRepository.storeLevels(filtredLevels);
        
        return Result.success();
    }
}
