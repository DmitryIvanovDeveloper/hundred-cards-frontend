import QuestionsError from './questions.error';

export default class QuestionNotUpdatedError extends QuestionsError {
    constructor(){
        super(``);
    }
}