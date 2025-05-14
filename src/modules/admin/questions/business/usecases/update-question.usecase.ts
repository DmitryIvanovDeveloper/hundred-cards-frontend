import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import Result from "@/infrastructure/helpers/result";
import IQuestionsHttpRepository from "../plugins/questions.http.repository.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { UpateQuestionOutput, UpdateQuestionInput } from "./types/update-question.type";
import QuestionNotUpdatedError from '../errors/questions-not-updated.error';
import IQuestionsLocalRepository from '../plugins/questions.local.repository.plugin';
import SelectQuestionUseCase from "./select-question.usecase";
import Question from "../entities/question";

@injectable()
export default class UpdateQuestionUseCase extends BaseUseCase<UpdateQuestionInput, UpateQuestionOutput>{
    constructor(
        @inject(TYPES.QuestionsHttpRepository)
        private readonly _repository: IQuestionsHttpRepository,

        @inject(TYPES.QuestionsLocalRepository)
        private readonly _localRepository: IQuestionsLocalRepository,

        @inject(TYPES.SelectQuestionUseCase)
        private readonly _selectQuestionUseCase: SelectQuestionUseCase,
    ) {
        super()
    }

    public execute = async (input: UpdateQuestionInput): Promise<UpateQuestionOutput> => {
        const question = this._localRepository.getQuestion().value;
        if (!question) {
            return Result.failure(new QuestionNotUpdatedError())
        }

        const updateRequest = question.toUpdateRequest();

        const result = await this._repository.update(question.id, updateRequest);

        const updatedQuestion = Question.toEntity(result.data);
        
        this._localRepository.updateQuestions(updatedQuestion);

        this._selectQuestionUseCase.execute({ questionId: question.id });

        return Result.success();
    }
}