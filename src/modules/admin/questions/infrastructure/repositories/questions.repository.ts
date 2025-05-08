import { LoadQuestionResponse, LoadQuestionsRequest } from '../../business/dtos/load-question.dto';
import IHttpClient from "@/infrastructure/api/http/http.interface";
import { TYPES } from "@/infrastructure/bootstrap/types";
import { inject } from "inversify";
import Result from "@/infrastructure/helpers/result";
import { NetworkError } from "@/infrastructure/errors/network.error";
import IQuestionsRepository from "../../business/plugins/questions.repository.plugin";
import Question from "../../business/entities/question";
import GetQuestionsResponse from "./dtos/get-questions.response";
import QuestionNotFoundError from '../../business/errors/question-not-found.error';
import { CreateQuestionRequest, CreateQuestionResponse } from '../../business/dtos/create-question.dto';
import { mapPostQuestionsResponseToDto, mapQuestionsResponseToDto } from './dtos/mapper';
import PostQuestionResponse, { PostQuestionRequest } from './dtos/post-questions.request';

export default class QuestionsRepository implements IQuestionsRepository  {

    constructor(
        @inject(TYPES.HttpClient)
        private readonly _httpClient: IHttpClient 
    ){}
    
   

    private _questions = new Array<Question>();
    private _question: Question | null;

    public storeQuestions(questions: Array<Question>): void {
        this._questions = questions;
    }

    public storeQuestion(question: Question): void {
        this._question = question;
    }

    public findQuestionById(id: string): Result<Question> {
        const expectedQuestion = this._questions.find(question => question.id === id);
        if (!expectedQuestion) {
            return Result.failure(new QuestionNotFoundError(id))
        }

        return Result.success(expectedQuestion);
    }

    public loadQuestions = async (loadQuestionsRequest: LoadQuestionsRequest): Promise<Result<Array<LoadQuestionResponse>>> => {
        const endpoint = `cards/admin/questions/?level_id=${loadQuestionsRequest.levelId}/`;

        const response = await this._httpClient.get<Array<GetQuestionsResponse>>(endpoint);
        if (!response.hasData()) {
            return this.handleNetworkError(response.errors as NetworkError)
        }

        const dto = response.data.map(mapQuestionsResponseToDto);

        return Result.success(dto);
    }

    public save = async (createQuestionRequest: CreateQuestionRequest): Promise<Result<CreateQuestionResponse[]>> => {
        const endpoint = `cards/admin/questions/`;

        const request = Array(new PostQuestionRequest(createQuestionRequest));

        const response = await this._httpClient.post<Array<PostQuestionResponse>, Array<PostQuestionRequest>>(endpoint, request);
        if (!response.hasData()) {
            return this.handleNetworkError(response.errors as NetworkError);
        }

        const dto = response.data.map(mapPostQuestionsResponseToDto);
        return Result.success(dto);
    }


    private handleNetworkError<T>(networkError: NetworkError): Result<T> {
        return Result.failure();
    }
}