import { v4 as uuidv4 } from "uuid";
import {
	CreateQuestionRequest,
	CreateQuestionResponse,
} from "../dtos/create-question.dto";
import { LoadQuestionResponse } from "../dtos/load-question.dto";
import { UpdateQuestionRequestDTO, UpdateQuestionResponseDTO } from "../dtos/update-question.dto";
import { Answer } from "./Answer";

export interface QuestionProps {
	id: string;
	text: string;
	points: number;
	levelId: string;
	lang: string;
	answers: Answer[];
	edited?: boolean;
	deleting?: boolean;
}

export default class Question {
	readonly id: string;
	readonly text: string;
	readonly points: number;
	readonly levelId: string;
	readonly answers: Answer[];
	readonly lang: string;
	readonly edited: boolean;
	readonly deleting: boolean;

	constructor(
		id: string,
		text: string,
		points: number,
		levelId: string,
		lang: string,
		answers: Answer[],
		edited: boolean = false,
		deleting: boolean = false,

	) {
		this.id = id;
		this.text = text;
		this.points = points;
		this.levelId = levelId;
		this.answers = answers;
		this.lang = lang;
		this.edited = edited;
		this.deleting = deleting;
	}

	public withUpdatedText(text: string): this {
		return this.cloneWith({ text, edited: true });
	}

	public withUpdatedPoints(points: number): this {
		return this.cloneWith({ points, edited: true });
	}

	public withUpdatedAnswerText(answerId: string, newText: string): this {
		const updatedAnswers = this.answers.map((a) =>
			a.id === answerId ? a.withUpdatedText(newText) : a
		);
		return this.cloneWith({ answers: updatedAnswers, edited: true });
	}

	public withUpdatedCorrectAnswer(answerId: string, isCorrect: boolean): this {
		const updatedAnswers = this.answers.map((a) =>
			a.id === answerId ? a.withUpdatedCorrect(isCorrect) : a.withUpdatedCorrect(false)
		);
		return this.cloneWith({ answers: updatedAnswers, edited: true });
	}

	public withNewAnswer(): this {
		const newAnswer = new Answer(uuidv4(), "", false, this.lang, this.id);
		return this.cloneWith({ answers: [...this.answers, newAnswer], edited: true });
	}

	public withRemovedAnswer(answerId: string): this {
		const updatedAnswers = this.answers.filter((a) => a.id !== answerId);
		return this.cloneWith({ answers: updatedAnswers, edited: true });
	}

	public withUpdatedDeleting(deleting: boolean): this {
		console.log(deleting)
		return this.cloneWith({ deleting });
	}

	public cloneWith(props: Partial<QuestionProps>): this {
		return new Question(
			this.id,
			props.text ?? this.text,
			props.points ?? this.points,
			props.levelId ?? this.levelId,
			props.lang ?? this.lang,
			props.answers ?? this.answers,
			props.edited ?? this.edited,
			props.deleting ?? this.deleting
		) as this;
	}

	static create(levelId: string): Question {
		return new Question("", "New Question", 0, levelId, "RU", []);
	}

	static toEntity(dto: LoadQuestionResponse | CreateQuestionResponse | UpdateQuestionResponseDTO): Question {
		const answers = dto.answers.map(
			(a) => new Answer(a.id, a.text, a.isCorrect, a.lang, a.questionId)
		);
		return new Question(dto.id, dto.text, dto.points, dto.levelId, dto.lang, answers);
	}

	toCreateRequest(): CreateQuestionRequest {
		return {
			id: this.id,
			text: this.text,
			points: this.points,
			levelId: this.levelId,
			lang: this.lang,
			answers: this.answers.map((a) => ({ ...a })),
		};
	}

	toUpdateRequest(): UpdateQuestionRequestDTO {
		return {
			id: this.id,
			text: this.text,
			points: this.points,
			levelId: this.levelId,
			lang: this.lang,
			answers: this.answers.map((a) => ({ ...a })),
		};
	}
}
