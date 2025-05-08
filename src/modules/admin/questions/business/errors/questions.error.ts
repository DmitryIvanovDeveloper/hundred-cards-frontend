import { AppError } from '@/infrastructure/errors/app.error';

export default class QuestionsError extends AppError {
    constructor(message: string) {
        super(message, 'QUESTIONS_ERROR');
    }
}
