import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import IQuestionsRepository from "../plugins/questions.repository.plugin";
import IQuestionPresenter from "../plugins/questions.presenter.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadQuestionsOutput } from "./types/load-questions.type";
import { SelectQuestionInput, SelectQuestionsOutput } from "./types/select-question.type";
import QuestionNotSelectedError from "../errors/question-not-selected.error";

@injectable()
export default class SelectQuestionUseCase extends BaseUseCase<SelectQuestionInput, SelectQuestionsOutput>{
    constructor(
        @inject(TYPES.QuestionsRepository)
        private readonly _repository: IQuestionsRepository,

        @inject(TYPES.QuestionsPresenter)
        private readonly _presenter: IQuestionPresenter
    ) {
        super()
    }

    public execute = async (input: SelectQuestionInput): Promise<LoadQuestionsOutput> => {

        const result = await this._repository.findQuestionById(input.questionId);
        if (!result.hasData()) {
            return Result.failure(new QuestionNotSelectedError(input.questionId));
        }

        const question = result.data;
        this._repository.storeQuestion(question);
        this._presenter.presentQuestion(question);

        return Result.success();
    }
}