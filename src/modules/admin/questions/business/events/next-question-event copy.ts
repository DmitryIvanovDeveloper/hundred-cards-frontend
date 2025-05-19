import { IEvent } from "@/infrastructure/events/event";

export default class LoadQuestionsEvent implements IEvent {
    public readonly levelId: string;

    constructor(levelId: string) {
        this.levelId = levelId;
    }
}
