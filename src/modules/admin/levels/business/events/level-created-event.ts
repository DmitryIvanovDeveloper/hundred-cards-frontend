import { IEvent } from "@/infrastructure/events/event";

export default class LevelCreatedEvent implements IEvent {
    readonly levelId: string;
    
    constructor(levelId: string) {
        this.levelId = levelId;
    }
}