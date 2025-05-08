import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import ILevelsRepository from "../plugins/levels.repository.plugin";
import ILevelsPresenter from "../plugins/levels.presenter.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import LevelNotFoundError from "../errors/level-not-found.error";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import { SelectLevelInput, SelectLevelOutput } from "./types/select-level.type";
import LevelSelectedEvent from "../events/level-selected-event";

@injectable()
export default class SelectLevelUseCase extends BaseUseCase<SelectLevelInput, SelectLevelOutput>{
    constructor(
        @inject(TYPES.LevelsRepository)
        private readonly _repository: ILevelsRepository,

        @inject(TYPES.LevelsPresenter)
        private readonly _presenter: ILevelsPresenter,

        @inject(SharedTYPES.EventBus)
        private readonly _eventBus: IEventBus
    ) {
        super()
    }

    public execute = async (input: SelectLevelInput): Promise<SelectLevelOutput> => {
        
        const result = await this._repository.findLevelById(input.levelId);
        if (!result.hasData()) {
            return Result.failure(new LevelNotFoundError(input.levelId));
        }

        const level = result.data;

        this._repository.storeLevel(level);
        this._presenter.presentLevel(level);

        await this._eventBus.publishAsync(new LevelSelectedEvent(input.levelId));

        return Result.success();
    }
}