import { inject } from "inversify";
import { TYPES } from "../../types";
import { TYPES as SharedTYPES } from "@infrastructure/bootstrap/types";
import IAuthenticationRepository from "../plugins/authentication.repository.interface";
import LoginDTO from "../dtos/login.dto";
import { LoginType } from "../dtos/login.type";
import AuthTokenUseCases from "@/modules/shared/authStorage/business/usecases/auth-token.usecases";
import Result from "@/infrastructure/helpers/result";

export default class TrySignInUseCase {

    constructor(
        @inject(TYPES.AuthenticationRepository)
        private readonly _repository: IAuthenticationRepository,

        @inject(SharedTYPES.AuthTokenUseCases)
        private readonly _authTokenUseCases: AuthTokenUseCases
    ){}

    public execute = async (dto: LoginDTO): Promise<Result<void>> => {
        
        var login = dto.type === LoginType.Email 
            ? dto.email 
            : dto.phone
        ;
        
        const result = await this._repository.signIn(login, dto.password);
        if (!result.hasData()) {
            return  Result.failure();
        }

        this._authTokenUseCases.store(result.data);
        return Result.success();
    }
}