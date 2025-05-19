import { IEvent } from "@/infrastructure/events/event";

export default class QuestionCreatedEvent implements IEvent {
    readonly questionId: string;

    constructor(questionId: string) {
        this.questionId = questionId;
    }
}
