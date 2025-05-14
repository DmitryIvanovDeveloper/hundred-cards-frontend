import { IEvent } from "@/infrastructure/events/event";

export default class AchievementSelectedEvent implements IEvent {
    achievementId: string;

    constructor(achievementId: string) {
        this.achievementId = achievementId;
    }
}