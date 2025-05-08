import Question, { Answer } from "../../business/entities/question";


export default class QuestionViewModel {
    readonly id: string;
    readonly text: string;
    readonly answers: Array<AnswerViewModel>;

    constructor(question: Question) {
        this.text = question.text
        this.id = question.id
        this.answers = question.answers.map(answer => new AnswerViewModel(answer));
    }
}

export class AnswerViewModel {
    readonly id: string;
    readonly text: string;
    readonly isCorrect: boolean;

    constructor(answer: Answer) {
        this.id = answer.id;
        this.text = answer.text;
        this.isCorrect = answer.isCorrect;
    }
}