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
	readonly order: number

	constructor(question: Question) {
		this.id = question.id;
		this.name = question.text;
		this.points = question.points;
		this.levelId = question.levelId;
		this.answers = question.answers.map(answer => new AnswerViewModel(answer)).sort((a, b) => a.order - b.order);
		this.edited = question.edited ?? false;
		this.deleting = question.deleting ?? false;
		this.order = question.order ?? 0;
	}
}

export class AnswerViewModel {
	readonly id: string;
	readonly name: string;
	readonly correct: boolean;
	readonly questionId: string;
	readonly lang: string;
	readonly order: number;

	constructor(answer: Answer) {
		this.id = answer.id;
		this.name = answer.text;
		this.questionId = answer.questionId;
		this.correct = answer.correct;
		this.lang = answer.lang;
		this.order = answer.order ?? 0;
	}
}

