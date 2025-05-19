import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import ILevelsHttpRepository from "../plugins/levels.http.repository.plugin";
import { DeleteLevelInput, DeleteLevelOutput } from "./types/create-level.type";
import LevelNotDeletedError from "../errors/level-not-deleted.error";
import DeleteLevelLocalUseCase from "./delete-level-local.usecase";

@injectable()
export default class DeleteLevelUseCase extends BaseUseCase<DeleteLevelInput, DeleteLevelOutput> {
    constructor(
        @inject(TYPES.LevelsHttpRepository)
        private readonly _repository: ILevelsHttpRepository,

        @inject(TYPES.DeleteLevelLocalUseCase)
        private readonly _deleteLevelLocalUseCase: DeleteLevelLocalUseCase,
    ) {
        super();
    }

    public async execute(input: DeleteLevelInput): Promise<DeleteLevelOutput> {

        const levelId = input.levelId;

        const result = await this._repository.deleteLevel(levelId);
        if (!result.isSuccess) {
            return Result.failure(new LevelNotDeletedError(levelId));
        }

        this._deleteLevelLocalUseCase.execute(input);

        return Result.success();
    }
}
