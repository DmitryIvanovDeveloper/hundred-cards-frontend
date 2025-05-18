import { id } from 'inversify';
import QuestionsError from './questions.error';

export default class QuestionNotUpdatedError extends QuestionsError {
    constructor(id?: string) {
        super(`Question with id '${id}' not updated `);
    }
}