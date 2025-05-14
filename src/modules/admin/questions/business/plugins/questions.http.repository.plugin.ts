import { UpdateQuestionRequestDTO, UpdateQuestionResponese } from '../dtos/update-question.dto';
import { CreateQuestionResponse } from '../dtos/create-question.dto';
import Result from "@/infrastructure/helpers/result";
import { LoadQuestionResponse, LoadQuestionsRequest } from "../dtos/load-question.dto";
import { CreateQuestionRequest } from "../dtos/create-question.dto";

export default interface IQuestionsHttpRepository {
    update(questionId: string, updateQuestionRequest: UpdateQuestionRequestDTO): Promise<Result<UpdateQuestionResponese>>
    save(question: CreateQuestionRequest): Promise<Result<CreateQuestionResponse[]>>
    loadQuestions(loadQuestionsRequest: LoadQuestionsRequest): Promise<Result<Array<LoadQuestionResponse>>>
}