import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { inject } from "inversify";
import IAchievementsHttpRepository from "../plugins/achievements.http.repository.plugin";
import Result from "@/infrastructure/helpers/result";
import { TYPES } from "../../types";
import IAchievementsLocalRepository from "../plugins/achievements.local-repository.plugin";
import { DeleteAchievementInput, DeleteAchievementOutput } from "./types/delete-achievement";
import AchievementNotDeletedError from "../errors/achievement-not-deleted.error";

export default class DeleteAchievementLocalUseCase extends BaseUseCase<DeleteAchievementInput, DeleteAchievementOutput> {

    constructor(
        @inject(TYPES.AchievementsLocalRepository)
        private readonly _localRepository: IAchievementsLocalRepository,
    ) {
        super();
    }

    public execute = async (input: DeleteAchievementInput): Promise<DeleteAchievementOutput> => {
        
        const achievements = this._localRepository.getAchievements().value;
        const updatedAchievements = achievements.filter(achievement => achievement.id !== input.achievementId);
        this._localRepository.storeAchievements(updatedAchievements);

        return Result.success();
    }
    
}