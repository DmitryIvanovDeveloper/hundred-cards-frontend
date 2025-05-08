import QuestionsError from './questions.error';

export default class QuestionsNotLoadedError extends QuestionsError {
    constructor(){
        super(``);
    }
}