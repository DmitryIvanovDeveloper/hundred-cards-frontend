import { inject } from "inversify";
import { TYPES } from "../../types";
import IAuthenticationRepository from "../plugins/authentication.repository.interface";
import RegistrationDTO from "../dtos/registration.dto";

export default class TrySignUpUseCase {

    constructor(
        @inject(TYPES.AuthenticationRepository)
        private readonly _repository: IAuthenticationRepository
    ){}

    public execute = async (dto: RegistrationDTO): Promise<void> => {
        await this._repository.signUp(dto);
    }
}