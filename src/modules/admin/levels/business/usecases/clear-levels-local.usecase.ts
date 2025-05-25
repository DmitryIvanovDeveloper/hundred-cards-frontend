import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import ILevelsLocalRepository from "../plugins/levels.local.repository.plugin";
import { DeleteLevelsInput, DeleteLevelsOutput } from "./types/delete-levels.type";

@injectable()
export default class ClearLevelsLocalUseCase extends BaseUseCase<DeleteLevelsInput, DeleteLevelsOutput> {
    
    constructor(
        @inject(TYPES.LevelsLocalRepository)
        private readonly _localRepository: ILevelsLocalRepository,
    ) {
        super();
    }

    public async execute(input: DeleteLevelsInput): Promise<DeleteLevelsOutput> {
        this._localRepository.clear();
        return Result.success();
    }
}
