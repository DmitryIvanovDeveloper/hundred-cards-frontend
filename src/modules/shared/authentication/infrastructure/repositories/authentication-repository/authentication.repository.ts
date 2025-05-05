import Result from '@/infrastructure/helpers/result';
import { inject, injectable } from 'inversify';
import IAuthenticationRepository from '../../../business/plugins/authentication.repository.interface';
import SignUpRequest from './dtos/sign-up.request';
import IRegistrationResponse from './dtos/registration-response';
import IHttpClient from '@/infrastructure//api/http/http.interface';
import Mapper from './dtos/mapper';
import ILoginResponse from './dtos/login.response';
import ILoginRequest from './dtos/login.request';
import { TYPES } from '@/infrastructure/bootstrap/types';
import { NetworkError } from '@/infrastructure//errors/network.error';
import AuthenticationError from '../../../business/errors/authentication.error';

@injectable()
export default class AuthenticationRepository implements IAuthenticationRepository {

    constructor(
        @inject(TYPES.HttpClient)
        private readonly _httpClient: IHttpClient,
    ){} 

    private _checkId: string = '';

    public signUp = async (): Promise<Result<string>> => {
        // const endpoint = 'api/client/v1/register';

        // const request = Mapper.mapDtoToRequest(signUpDto, this._checkId);


        // const response = await this._httpClient.post<IRegistrationResponse, SignUpRequest>(endpoint, request);

        // if (!response.isSuccess || !response.data) {
        //     return this.handleNetworkError(response.errors as AuthenticationError);
        // }

        // return Result.success(response.data.token);
        return Result.failure();
    };

    public signIn = async (email: string, password: string): Promise<Result<string>> => {
        const endpoint = 'api/client/v1/auth';

        const request: ILoginRequest = {
            login: email,
            password: password,
        };

        const response = await this._httpClient.post<ILoginResponse, ILoginRequest>(endpoint, request);

        if (!response.isSuccess || !response.data) {
            return this.handleNetworkError(response.errors as AuthenticationError);
        }

        return Result.success(response.data.token);
    };


    private handleNetworkError<T>(networkError: NetworkError): Result<T> {
      
        return Result.failure();
    }
}
