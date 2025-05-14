import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as LevelTYPES } from "@/modules/admin/levels/types";
import Result from "@/infrastructure/helpers/result";
import IQuestionsHttpRepository from "../plugins/questions.http.repository.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { CreateQuestionInput, CreateQuestionsOutput } from "./types/create-question.type";
import Question from "../entities/question";
import QuestionNotCreatedError from "../errors/questions-not-created.error";
import QuestionsLocalRepository from "../../infrastructure/repositories/questions.local.repository";

@injectable()
export default class CreateQuestionUseCase extends BaseUseCase<CreateQuestionInput, CreateQuestionsOutput>{
    constructor(
        @inject(TYPES.QuestionsHttpRepository)
        private readonly _repository: IQuestionsHttpRepository,

        @inject(TYPES.QuestionsLocalRepository)
        private readonly _localRepository: QuestionsLocalRepository,
    ) {
        super()
    }

    public execute = async (input: CreateQuestionInput): Promise<CreateQuestionsOutput> => {

        const levelId = input.levelId

        const question = Question.create(levelId).toCreateRequest();

        const result = await this._repository.save(question);
        if (!result.hasData()) {
            return Result.failure(new QuestionNotCreatedError())
        }

        const questions = result.data.map(dto => Question.toEntity(dto))
      
        this._localRepository.storeQuestions(questions);

        return Result.success();
    }
}