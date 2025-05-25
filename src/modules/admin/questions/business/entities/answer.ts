
import { v4 as uuidv4 } from "uuid";

export interface AnswerProps {
	readonly id?: string;
	readonly text?: string;
	readonly isCorrect?: boolean;
	readonly lang?: string;
	readonly questionId?: string;
}

export class Answer {
	readonly id: string;
	readonly text: string;
	readonly isCorrect: boolean;
	readonly lang: string;
	readonly questionId: string;

	constructor(props: AnswerProps) {
		this.id = props.id ?? uuidv4();
		this.text = props.text ?? '';
		this.isCorrect = props.isCorrect ?? false;
		this.lang = props.lang ?? 'RU';
		this.questionId = props.questionId ?? this.questionId;
	}

	public withUpdatedText(newText: string): this {
		return this.cloneWith({ text: newText });
	}

	public withUpdatedCorrect(isCorrect: boolean): this {
		return this.cloneWith({ isCorrect });
	}

	public cloneWith(params: Partial<AnswerProps>): this {
		return {
			id: params.id ?? this.id,
			text: params.text ?? this.text,
			isCorrect: params.isCorrect ?? this.isCorrect,
			lang: params.lang ?? this.lang,
			questionId: params.questionId ?? this.questionId
		 } as this;
	}


	static create(questionId: string, text: string, correct: boolean): Answer {
		return new Answer({questionId, text, isCorrect: correct});
	}
}
