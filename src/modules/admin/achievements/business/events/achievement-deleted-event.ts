import { IEvent } from "@/infrastructure/events/event";

export default class AchievementDeletedEvent implements IEvent {
    achievementId: string;

    constructor(achievementId: string) {
        this.achievementId = achievementId;
    }
}