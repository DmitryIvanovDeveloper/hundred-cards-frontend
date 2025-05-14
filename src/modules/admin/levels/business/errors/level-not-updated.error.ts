import { AppError } from '@/infrastructure/errors/app.error';
import ProjectsError from './levels.error';

export default class LevelNotUpdatedError extends ProjectsError {
    constructor(){
        super(``);
    }
}