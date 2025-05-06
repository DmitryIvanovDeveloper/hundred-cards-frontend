import Result from '@/infrastructure/helpers/result';
import RegistrationDTO from '../dtos/registration.dto';

export default interface IAuthenticationRepository {

    readonly signUp: (signupDto: RegistrationDTO) => Promise<Result<string>>;
    readonly signIn: (email: string, password: string) => Promise<Result<string>>
}
