import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import Question from "../entities/question";
import IQuestionsRepository from "../plugins/questions.repository.plugin";
import IQuestionPresenter from "../plugins/questions.presenter.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadQuestionsInput, LoadQuestionsOutput } from "./types/load-questions.type";
import { LoadQuestionsRequest } from "../dtos/load-question.dto";
import QuestionsNotLoadedError from "../errors/questions-not-loaded.error";
import InitializeQuestionsUseCase from "./initialize-questions.usecase";

@injectable()
export default class LoadPresentQuestionsUseCase extends BaseUseCase<LoadQuestionsInput, LoadQuestionsOutput>{
    constructor(
        @inject(TYPES.QuestionsRepository)
        private readonly _repository: IQuestionsRepository,

        @inject(TYPES.InitializeQuestionsUseCase)
        private readonly _initializeQuestionsUseCase: InitializeQuestionsUseCase,
    ) {
        super()
    }

    public execute = async (input: LoadQuestionsInput): Promise<LoadQuestionsOutput> => {

        const loadQuestionRequest = new LoadQuestionsRequest(input);
        const result = await this._repository.loadQuestions(loadQuestionRequest);

        if (!result.hasData()) {
            return Result.failure(new QuestionsNotLoadedError());
        }

        this._initializeQuestionsUseCase.execute({dto: result.data})

        return Result.success();
    }
}