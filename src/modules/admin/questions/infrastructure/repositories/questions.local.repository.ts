import Result from "@/infrastructure/helpers/result";
import Question from "../../business/entities/question";
import QuestionNotFoundError from '../../business/errors/question-not-found.error';
import IQuestionsLocalRepository from '../../business/plugins/questions.local.repository.plugin';
import { Ref, ref } from "vue";

export default class QuestionsLocalRepository implements IQuestionsLocalRepository  {
   
    private _questions = ref<ReadonlyArray<Question>>([]);
    private _question = ref<Question>()

    public storeQuestions(questions: ReadonlyArray<Question>): void {
        this._questions.value = questions;
    }

    public updateQuestions(updatedQuestion: Question): void {
        const index = this._questions.value.findIndex((question) => question.id === updatedQuestion.id);
        if (index === -1) {
            return;
        }

        const copy = [...this._questions.value];
        copy[index] = updatedQuestion;
        this._questions.value = copy;
        this._question.value = updatedQuestion;
    }

    public addQuestion(question: Question) {
        this._questions.value = [...this._questions.value, question];
    }

    public getQuestions(): Ref<ReadonlyArray<Question>> {
        return this._questions
    }
     
    public getQuestion(): Ref<Question | undefined> {
        return this._question;
    }

    public storeQuestion(question: Question): void {
        this._question.value = question;
    }

    public clearQuestion(): void {
        this._question.value = undefined;
    }

    public findQuestionById(id: string): Result<Question> {
        const expectedQuestion = this._questions.value?.find(question => question.id === id);
        if (!expectedQuestion) {
            return Result.failure(new QuestionNotFoundError(id))
        }

        return Result.success(expectedQuestion);
    }

    public clear = (): void => {
        this._questions.value = [];
        this.clearQuestion();
    }
}