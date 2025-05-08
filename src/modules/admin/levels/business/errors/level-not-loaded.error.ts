import { AppError } from '@/infrastructure/errors/app.error';
import ProjectsError from './levels.error';

export default class LevelsNotLoadedrror extends ProjectsError {
    constructor(){
        super(``);
    }
}