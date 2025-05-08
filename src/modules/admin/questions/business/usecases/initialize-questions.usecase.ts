import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import IQuestionsRepository from "../plugins/questions.repository.plugin";
import IQuestionPresenter from "../plugins/questions.presenter.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import Question from "../entities/question";
import { InitializeQuestionsInput, InitializeQuestionsOutput } from "./types/initialize-questions.type";
import SelectQuestionUseCase from "./select-question.usecase";

@injectable()
export default class InitializeQuestionsUseCase extends BaseUseCase<InitializeQuestionsInput, InitializeQuestionsOutput>{
    constructor(
        @inject(TYPES.QuestionsRepository)
        private readonly _repository: IQuestionsRepository,


        @inject(TYPES.SelectQuestionUseCase)
        private readonly _selectQuestionUseCase: SelectQuestionUseCase,


        @inject(TYPES.QuestionsPresenter)
        private readonly _presenter: IQuestionPresenter,
    ) {
        super()
    }

    public execute = async (input: InitializeQuestionsInput): Promise<InitializeQuestionsOutput> => {

        const questions = input.dto.map(dto => Question.fromDto(dto));
        this._repository.storeQuestions(questions);
        this._presenter.presentQuestions(questions);
        this._selectQuestionUseCase.execute({questionId: questions[0].id});
        return Result.success();
    }
}