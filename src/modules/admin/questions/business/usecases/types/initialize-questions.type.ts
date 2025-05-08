import Result from "@/infrastructure/helpers/result";
import { LoadQuestionResponse } from "../../dtos/load-question.dto";
import { CreateQuestionResponse } from "../../dtos/create-question.dto";

export type InitializeQuestionsInput = {
    dto: Array<LoadQuestionResponse | CreateQuestionResponse>
};

export type InitializeQuestionsOutput = Result<void>;
