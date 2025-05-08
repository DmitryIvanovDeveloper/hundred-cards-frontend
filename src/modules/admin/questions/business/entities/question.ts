import { CreateQuestionRequest, CreateQuestionResponse } from "../dtos/create-question.dto";
import { LoadQuestionResponse } from "../dtos/load-question.dto";

export class Answer {
	readonly id: string;
	readonly text: string;
	readonly isCorrect: boolean;
	readonly lang: string;
	readonly questionId: string;

	constructor(id: string, text: string, isCorrect: boolean, lang: string, questionId: string) {
		this.id = id;
		this.text = text;
		this.isCorrect = isCorrect;
		this.lang = lang;
		this.questionId = questionId;
	}
}

export default class Question {
	readonly id: string;
	readonly text: string;
	readonly points: number;
	readonly levelId: string;
	readonly answers: Answer[];
	readonly questionId: string;
	readonly lang: string;


	constructor(id: string, text: string, points: number, levelId:string, lang: string, answers: Answer[]) {
		this.id = id;
		this.text = text;
		this.points = points;
		this.levelId = levelId;
		this.answers = answers;
		this.lang = lang;
	}

	static create(levelId: string): Question {
		const answers = new Array<Answer>();
		return new Question('', 'New Question', 0, levelId, "RU", answers);
	}

	toCreateRequest(): CreateQuestionRequest {
		return {
			id: this.id,
			text: this.text,
			points: this.points,
			levelId: this.levelId,
			lang: this.lang,
			answers: []
		};
	}

	static fromDto(dto: LoadQuestionResponse | CreateQuestionResponse): Question {
		const answers: Answer[] = dto.answers.map(answer => new Answer(
			answer.id,
			answer.text,
			answer.isCorrect,
			answer.lang,
			dto.levelId
		));

		return new Question(
			dto.id,
			dto.text,
			dto.points,
			dto.levelId,
			dto.lang,
			answers
		);
	}
}
