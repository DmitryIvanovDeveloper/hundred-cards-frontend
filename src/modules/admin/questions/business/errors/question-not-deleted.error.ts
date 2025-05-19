import QuestionsError from './questions.error';

export default class QuestionNotDeletedError extends QuestionsError {
    constructor(id?: string){
        super(`Question not deleted with id '${id}'`);
    }
}