import Result from "@/infrastructure/helpers/result";
import Question from "../entities/question";
import { Ref } from "vue";

export default interface IQuestionsLocalRepository {
    clear(): void;
    clearQuestion(): void;
    storeQuestions(questions: ReadonlyArray<Question>): void;
    storeQuestion(question: Question): void;
    updateQuestions(updatedQuestion: Question): void;
    findQuestionById(id: string): Result<Question>
    getQuestions(): Ref<ReadonlyArray<Question>>;
    getQuestion(): Ref<Question | undefined>;
}