import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@/infrastructure/bootstrap/types";
import Result from "@/infrastructure/helpers/result";
import { IEventBus } from "@/infrastructure/events/event-bus.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import ILevelsHttpRepository from "../plugins/levels.http.repository.plugin";
import ILevelsLocalRepository from "../plugins/levels.local.repository.plugin";
import { UpdateLevelInput, UpdateLevelOutput } from "./types/update-level.type";
import LevelNotUpdatedError from "../errors/level-not-updated.error";

@injectable()
export default class UpdateLevelUseCase extends BaseUseCase<UpdateLevelInput, UpdateLevelOutput> {
	constructor(
		@inject(TYPES.LevelsHttpRepository)
		private readonly _repository: ILevelsHttpRepository,

		@inject(TYPES.LevelsLocalRepository)
		private readonly _localRepository: ILevelsLocalRepository,

		@inject(SharedTYPES.EventBus)
		private readonly _eventBus: IEventBus,
	) {
		super();
	}

  public async execute(input: UpdateLevelInput): Promise<UpdateLevelOutput> {
		const level = this._localRepository.getLevel().value;

		if (!level) {
			return Result.failure(new LevelNotUpdatedError())
		}

		const updateRequest = level.toUpdateRequest();

		const result = await this._repository.updateLevel(updateRequest, level.id);
		if (!result.isSuccess) {
			return Result.failure(new LevelNotUpdatedError(level.id));
		}

		return Result.success();
  }
}
