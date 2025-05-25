import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import IQuestionsHttpRepository from "../plugins/questions.http.repository.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { UpateQuestionOutput, UpdateQuestionInput } from "./types/update-question.type";
import QuestionNotUpdatedError from '../errors/questions-not-updated.error';
import IQuestionsLocalRepository from '../plugins/questions.local.repository.plugin';
import Question from "../entities/question";

@injectable()
export default class UpdateQuestionUseCase extends BaseUseCase<UpdateQuestionInput, UpateQuestionOutput>{
    constructor(
        @inject(TYPES.QuestionsHttpRepository)
        private readonly _repository: IQuestionsHttpRepository,

        @inject(TYPES.QuestionsLocalRepository)
        private readonly _localRepository: IQuestionsLocalRepository,
    ) {
        super()
    }

    public execute = async (input: UpdateQuestionInput): Promise<UpateQuestionOutput> => {
        const questions = this._localRepository.getQuestions().value;
        if (!questions.length) {
            return Result.failure(new QuestionNotUpdatedError())
        }

        const editedQuestions = questions.filter(question => question.edited);

        await Promise.all(editedQuestions.map(async question => {
            const updateRequest = question.toUpdateRequest();
            const result = await this._repository.update(question.id, updateRequest);
            if (!result.hasData()) {
                return Result.failure(new QuestionNotUpdatedError(question.id))
            }

            const updatedQuestion = Question.toEntity(result.data);
            this._localRepository.updateQuestions(updatedQuestion);
        }))

        return Result.success();
    }
}