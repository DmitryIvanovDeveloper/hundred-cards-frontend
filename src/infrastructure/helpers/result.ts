import { AppError } from '../errors/app.error';
import { container, Enviroment } from '../bootstrap/inversify.config';
import { TYPES } from '../bootstrap/types';
import { ToastNotificationUseCases } from '@/modules/shared/notification/business/usecases/toast-notification.usecases';

const environment = import.meta.env.VITE_APP_ENV;

export default class Result<T> {
    constructor(
        public isSuccess: boolean,
        public data?: T,
        public errors?: Array<AppError> | AppError | null,
        public message?: string,
    ) {}

    public static success<U>(data?: U): Result<U> {
        return new Result<U>(true, data);
    }

    public static failure<U>(errors?: Array<AppError> | AppError | null, message?: string): Result<U> {
        if (import.meta.env.VITE_APP_ENV === Enviroment.local) {
            // const toast = container.get<ToastNotificationUseCases>(TYPES.ToastNotificationUseCases)
            // toast.error(JSON.stringify(errors))
            console.log(errors, message);
        }
        return new Result<U>(false, undefined, errors, message);
    }
}
