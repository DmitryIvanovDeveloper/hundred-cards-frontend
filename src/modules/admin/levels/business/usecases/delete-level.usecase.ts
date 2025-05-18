import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import Result from "@/infrastructure/helpers/result";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import ILevelsHttpRepository from "../plugins/levels.http.repository.plugin";
import { DeleteLevelInput, DeleteLevelOutput } from "./types/create-level.type";
import LevelNotDeletedError from "../errors/level-not-deleted.error";
import LevelDeletedEvent from "../events/level-deleted-event";
import { ToastNotificationUseCases } from "@/modules/shared/notification/business/usecases/toast-notification.usecases";

@injectable()
export default class DeleteLevelUseCase extends BaseUseCase<DeleteLevelInput, DeleteLevelOutput> {
    constructor(
        @inject(TYPES.LevelsHttpRepository)
        private readonly _repository: ILevelsHttpRepository,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus,

        @inject(SharedTYPES.ToastNotificationUseCases)
        private readonly _toastNotificationUseCases: ToastNotificationUseCases,
    ) {
        super();
    }

    public async execute(input: DeleteLevelInput): Promise<DeleteLevelOutput> {

        const levelId = input.levelId;

        const result = await this._repository.deleteLevel(levelId);
        if (!result.isSuccess) {
            return Result.failure(new LevelNotDeletedError(levelId));
        }

        this._toastNotificationUseCases.success('Level successfully deleted');
        
        this._eventBus.publishAsync(new LevelDeletedEvent(levelId))
        return Result.success();
    }
}
