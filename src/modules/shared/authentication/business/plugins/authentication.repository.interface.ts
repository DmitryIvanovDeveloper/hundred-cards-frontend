import Result from '@/infrastructure/helpers/result';
import ISignUpDto from '../dtos/sign-up-dto';
import ICheckRegisterPhoneNumber from '../dtos/check-register-phone-number.dto';

export default interface IAuthenticationRepository {

    readonly signUp: (signupDto: ISignUpDto) => Promise<Result<string>>;
    readonly signIn: (email: string, password: string) => Promise<Result<string>>
}
