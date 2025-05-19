import { Answer } from "../../business/entities/Answer";
import Question from "../../business/entities/question";


export default class QuestionViewModel {
	readonly id: string;
	readonly levelId: string;
	readonly edited: boolean;
	readonly deleting: boolean;
	readonly answers: Array<AnswerViewModel>;

	readonly name: string;
	readonly points: number

	constructor(question: Question) {
		this.id = question.id;
		this.name = question.text;
		this.points = question.points;
		this.levelId = question.levelId;
		this.answers = question.answers.map(answer => new AnswerViewModel(answer));
		this.edited = question.edited ?? false;
		this.deleting = question.deleting ?? false;
	}
}

export class AnswerViewModel {
	readonly id: string;
	readonly name: string;
	readonly isCorrect: boolean;
	readonly questionId: string;
	readonly lang: string;

	constructor(answer: Answer) {
		this.id = answer.id;
		this.name = answer.text;
		this.questionId = answer.questionId;
		this.isCorrect = answer.isCorrect;
		this.lang = answer.lang;
	}
}

