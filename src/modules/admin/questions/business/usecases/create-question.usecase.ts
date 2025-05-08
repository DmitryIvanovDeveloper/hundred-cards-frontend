import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { TYPES as LevelTYPES } from "@/modules/admin/levels/types";
import Result from "@/infrastructure/helpers/result";
import IQuestionsRepository from "../plugins/questions.repository.plugin";
import IQuestionPresenter from "../plugins/questions.presenter.plugin";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { SelectQuestionInput } from "./types/select-question.type";
import { CreateQuestionInput, CreateQuestionsOutput } from "./types/create-question.type";
import Question from "../entities/question";
import ILevelsService from "@/modules/admin/levels/business/plugins/levels.service.plugin";
import QuestionNotCreatedError from "../errors/questions-not-created.error";
import InitializeQuestionsUseCase from "./initialize-questions.usecase";

@injectable()
export default class CreateQuestionUseCase extends BaseUseCase<CreateQuestionInput, CreateQuestionsOutput>{
    constructor(
        @inject(TYPES.QuestionsRepository)
        private readonly _repository: IQuestionsRepository,

        @inject(LevelTYPES.LevelsService)
        private readonly _levelService: ILevelsService,

        @inject(TYPES.InitializeQuestionsUseCase)
        private readonly _initializeQuestionsUseCase: InitializeQuestionsUseCase,
    ) {
        super()
    }

    public execute = async (input: CreateQuestionInput): Promise<CreateQuestionsOutput> => {

        const levelResult = await this._levelService.getSelectedLevelId();
        if (!levelResult.hasData()) {
            return Result.failure(new QuestionNotCreatedError())
        }

        const levelId = levelResult.data;

        const question = Question.create(levelId).toCreateRequest();

        const result = await this._repository.save(question);
        if (!result.hasData()) {
            return Result.failure(new QuestionNotCreatedError())
        }

        this._initializeQuestionsUseCase.execute({
            dto: result.data
        });

        return Result.success();
    }
}