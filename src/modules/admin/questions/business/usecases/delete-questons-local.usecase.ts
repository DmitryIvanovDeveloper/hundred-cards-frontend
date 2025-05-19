import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import IQuestionsLocalRepository from "../plugins/questions.local.repository.plugin";
import { DeleteQuestionsInput, DeleteQuestionsOutput } from "./types/delete-questions";

@injectable()
export default class DeleteQuestionsLocalUseCase extends BaseUseCase<DeleteQuestionsInput, DeleteQuestionsOutput> {

    constructor(
        @inject(TYPES.QuestionsLocalRepository)
        private readonly _localRepository: IQuestionsLocalRepository,
    ) {
        super()
    }

    public execute = async (input: DeleteQuestionsInput): Promise<DeleteQuestionsOutput> => {
        const questions = this._localRepository.getQuestions().value;
        const filteredQuestions = questions.filter(question => question.id === input.levelId);
        this._localRepository.storeQuestions(filteredQuestions);
        return Result.success();
    }
}