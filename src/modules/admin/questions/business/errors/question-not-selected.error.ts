import QuestionsError from './questions.error';

export default class QuestionNotSelectedError extends QuestionsError {
    constructor(id: string){
        super(`Question with id '${id}' not selected`);
    }
}