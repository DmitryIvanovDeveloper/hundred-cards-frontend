import QuestionsError from './questions.error';

export default class QuestionNotFoundError extends QuestionsError {
    constructor(id: string){
        super(`Question with id '${id}' not found`);
    }
}