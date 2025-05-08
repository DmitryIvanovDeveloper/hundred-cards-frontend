import Question from "../entities/question";

export default interface IQuestionPresenter {
    presentQuestion(question: Question): void;
    presentQuestions(questions: Array<Question>): void;
}