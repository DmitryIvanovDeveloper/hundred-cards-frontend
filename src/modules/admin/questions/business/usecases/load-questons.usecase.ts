import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import IQuestionsHttpRepository from "../plugins/questions.http.repository.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadQuestionsInput, LoadQuestionsOutput } from "./types/load-questions.type";
import { LoadQuestionsRequest } from "../dtos/load-question.dto";
import QuestionsNotLoadedError from "../errors/questions-not-loaded.error";
import IQuestionsLocalRepository from "../plugins/questions.local.repository.plugin";
import Question from "../entities/question";
import SelectQuestionUseCase from "./select-question.usecase";

@injectable()
export default class LoadPresentQuestionsUseCase extends BaseUseCase<LoadQuestionsInput, LoadQuestionsOutput>{
    constructor(
        @inject(TYPES.QuestionsHttpRepository)
        private readonly _httpRepository: IQuestionsHttpRepository,

        @inject(TYPES.QuestionsLocalRepository)
        private readonly _localRepository: IQuestionsLocalRepository,

        @inject(TYPES.SelectQuestionUseCase)
        private readonly _selectQuestionUseCase: SelectQuestionUseCase,
    ) {
        super()
    }

    public execute = async (input: LoadQuestionsInput): Promise<LoadQuestionsOutput> => {

        const loadQuestionRequest = new LoadQuestionsRequest(input);
        const result = await this._httpRepository.loadQuestions(loadQuestionRequest);

        if (!result.hasData()) {
            return Result.failure(new QuestionsNotLoadedError());
        }

        const questions = result.data.map(dto => Question.toEntity(dto))
        this._localRepository.storeQuestions(questions);

        this._selectQuestionUseCase.execute({ questionId: questions[0].id})
        return Result.success();
    }
}