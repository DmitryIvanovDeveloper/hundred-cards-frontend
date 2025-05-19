import { IEvent } from "@/infrastructure/events/event";

export default class QuestionDeletedEvent implements IEvent {
    public readonly questionId: string;

    constructor(questionId: string) {
        this.questionId = questionId;
    }
}
