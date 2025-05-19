import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import IQuestionsLocalRepository from "../plugins/questions.local.repository.plugin";
import { DeleteQuestionInput, DeleteQuestionOutput } from "./types/delete-questions";

@injectable()
export default class DeleteQuestionLocalUseCase extends BaseUseCase<DeleteQuestionInput, DeleteQuestionOutput> {

    constructor(
        @inject(TYPES.QuestionsLocalRepository)
        private readonly _localRepository: IQuestionsLocalRepository,
    ) {
        super()
    }

    public execute = async (input: DeleteQuestionInput): Promise<DeleteQuestionOutput> => {
        const questions = this._localRepository.getQuestions().value;
        const filteredQuestions = questions.filter(question => question.id !== input.questionId);
        this._localRepository.storeQuestions(filteredQuestions);
        return Result.success();
    }
}