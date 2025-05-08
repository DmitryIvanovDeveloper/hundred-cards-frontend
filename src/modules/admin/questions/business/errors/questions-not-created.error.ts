import QuestionsError from './questions.error';

export default class QuestionNotCreatedError extends QuestionsError {
    constructor(){
        super(``);
    }
}