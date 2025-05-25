import Result from "@/infrastructure/helpers/result";
import Question from "../entities/question";
import { Ref } from "vue";

export default interface IQuestionsLocalRepository {
    clear(): void;
    clearQuestion(): void;
    storeQuestions(questions: Array<Question>): void;
    storeQuestion(question: Question): void;
    updateQuestions(updatedQuestion: Question): void;
    findQuestionById(id: string): Result<Question>
    getQuestions(): Ref<Array<Question>>;
    getQuestion(): Ref<Question | undefined>;
}