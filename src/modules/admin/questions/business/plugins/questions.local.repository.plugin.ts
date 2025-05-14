import Result from "@/infrastructure/helpers/result";
import Question, { Answer } from "../entities/question";
import { Ref } from "vue";

export default interface IQuestionsLocalRepository {
    storeQuestions(questions: Array<Question>): void;
    storeQuestion(question: Question): void;
    updateQuestions(updatedQuestion: Question): void;
    findQuestionById(id: string): Result<Question>
    getQuestions(): Ref<Array<Question>>;
    getQuestion(): Ref<Question | undefined>;
}