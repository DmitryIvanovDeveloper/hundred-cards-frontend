import { IEvent } from "@/infrastructure/events/event";

export default class LevelSelectedEvent implements IEvent {
    readonly levelId: string;
    
    constructor(levelId: string) {
        this.levelId = levelId;
    }
}