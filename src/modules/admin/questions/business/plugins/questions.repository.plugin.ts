import { CreateQuestionResponse } from './../dtos/create-question.dto';
import Result from "@/infrastructure/helpers/result";
import Question from "../entities/question";
import { LoadQuestionResponse, LoadQuestionsRequest } from "../dtos/load-question.dto";
import { CreateQuestionRequest } from "../dtos/create-question.dto";

export default interface IQuestionsRepository {
    save(question: CreateQuestionRequest): Promise<Result<CreateQuestionResponse[]>>
    storeQuestions(questions: Array<Question>): void;
    storeQuestion(question: Question): void;
    loadQuestions(loadQuestionsRequest: LoadQuestionsRequest): Promise<Result<Array<LoadQuestionResponse>>>
    findQuestionById(id: string): Result<Question>
}