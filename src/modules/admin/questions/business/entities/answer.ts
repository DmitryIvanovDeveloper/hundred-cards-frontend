export interface AnswerProps {
	id: string;
	text: string;
	isCorrect: boolean;
	lang: string;
	questionId: string;
}

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

	public withUpdatedText(newText: string): this {
		return this.cloneWith({ text: newText });
	}

	public withUpdatedCorrect(isCorrect: boolean): this {
		return this.cloneWith({ isCorrect });
	}

	public cloneWith(params: Partial<AnswerProps>): this {
		return new Answer(
			params.id ?? this.id,
			params.text ?? this.text,
			params.isCorrect ?? this.isCorrect,
			params.lang ?? this.lang,
			params.questionId ?? this.questionId
		) as this;
	}
}
