import { inject, injectable } from "inversify";
import IAchievementsLocalRepository from "@/modules/admin/achievements/business/plugins/achievements.local-repository.plugin";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@/modules/admin/projects/types";
import SelectAchievementUseCase from "../../business/usecases/select-achievements.usecase";
import Result from "@/infrastructure/helpers/result";
import CreateAchievementUseCase from "../../business/usecases/create-achievement.usecase";
import IProjectsService from "@/modules/admin/projects/business/plugins/projects.service.plugin";
import AchievementNotCreatedError from "../../business/errors/achievement-not-created.error";
import NextAchievementUseCase from "../../business/usecases/next-achievement.usecase";
import PreviousAchievementUseCase from "../../business/usecases/previous-achievement.usecase";

@injectable()
export default class AchievementsController {
  
	constructor(
		@inject(TYPES.AchievementsLocalRepository)
		private readonly _repository: IAchievementsLocalRepository,

		@inject(TYPES.SelectAchievementUseCase)
		private readonly _selectAchievementUseCase: SelectAchievementUseCase,

		@inject(TYPES.CreateAchievementUseCase)
		private readonly _createAchievementUseCase: CreateAchievementUseCase,

		@inject(TYPES.NextAchievementUseCase)
		private readonly _nextAchievementUseCase: NextAchievementUseCase,

		@inject(TYPES.PreviousAchievementUseCase)
		private readonly _previousAchievementUseCase: PreviousAchievementUseCase,

		@inject(SharedTYPES.ProjectsService)
		private readonly _projectsService: IProjectsService
	) {}

	private get _selectedAchievement() {
		const achievement = this._repository.getAchievement().value;
		if (!achievement) {
			return null;
		}
		return achievement;
	}

	public createAchievement = async (): Promise<Result<void>> => {
		const result = this._projectsService.getSelectedProjectId();
		if (!result.hasData()) {
			return Result.failure(new AchievementNotCreatedError())
		}

        return await this._createAchievementUseCase.execute({ projectId: result.data });
    }

	public updateName(name: string) {
		const achievement = this._repository.getAchievement().value;
		if (!achievement) {
			return;
		}
		const updatedAchievement = achievement.updatedWithName(name);
		this._repository.updateAchievements(updatedAchievement);
	}

	public async selectAchievement(id: string): Promise<Result<void>> {
		return  await this._selectAchievementUseCase.execute({ achievementId: id });
	}

	public updateNumCorrectAnswers(num: number): void {
		const achievement = this._repository.getAchievement().value;
		if (!achievement) {
			return;
		}

		const updatedAchievement = achievement.updatedWithCorrectAnswersInRow(num);
		this._repository.updateAchievements(updatedAchievement);
    }

	public updatePublished(published: boolean): void {
		const achievement = this._repository.getAchievement().value;
		if (!achievement) {
			return;
		}

		const updatedAchievement = achievement.updatedWithPublished(published);
		this._repository.updateAchievements(updatedAchievement);
    }

	public updateDescription(decription: string): void {
		const achievement = this._repository.getAchievement().value;
		if (!achievement) {
			return;
		}

		const updatedAchievement = achievement.updatedWithDescription(decription);
		this._repository.updateAchievements(updatedAchievement);
    }

	public updateLevelsId(id: string): void {
		const achievement = this._repository.getAchievement().value;
		if (!achievement) {
			return;
		}

		const updatedAchievement = achievement.updatedWithAddedLevelId(id);
		this._repository.updateAchievements(updatedAchievement);
	}

	public updateQuestionsId(id: string): void {
		const achievement = this._repository.getAchievement().value;
		if (!achievement) {
			return;
		}

		const updatedAchievement = achievement.updatedWithAddedLevelId(id);
		this._repository.updateAchievements(updatedAchievement);
	}

	public nextAchievement = (): void => {
		this._nextAchievementUseCase.execute();
	}

	public previousAchievement = (): void => {
		this._previousAchievementUseCase.execute();
	}
}
