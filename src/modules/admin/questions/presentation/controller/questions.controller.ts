import { inject } from "inversify";
import { TYPES } from "../../types";
import SelectQuestionUseCase from "../../business/usecases/select-question.usecase";
import CreateQuestionUseCase from "../../business/usecases/create-question.usecase";

export default class QuestionsController  {
    constructor(
        @inject(TYPES.SelectQuestionUseCase)
        private readonly _selectQueationUseCase: SelectQuestionUseCase,

        @inject(TYPES.CreateQuestionUseCase)
        private readonly _createQuestionUseCase: CreateQuestionUseCase
    ){}  

    public selectQuestion = (questionId: string) => {
        this._selectQueationUseCase.execute({ questionId });
    }

    public createQueustion = async (): Promise<void> => {
        await this._createQuestionUseCase.execute();
    }
} 