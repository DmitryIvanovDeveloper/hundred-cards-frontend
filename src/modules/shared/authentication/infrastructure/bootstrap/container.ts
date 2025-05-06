import { TYPES } from '../../types';

import AuthenticationRepository from '../repositories/authentication-repository/authentication.repository';
import RegistrationController from '../../presentation/controller/registration.controller';
import IRegistrationPresenter from '../../business/plugins/registration.presenter.interface';
import LoginPresenter from '../../presentation/presenter/login.presenter';
import LoginController from '../../presentation/controller/login.controller';
import IAuthenticationRepository from '../../business/plugins/authentication.repository.interface';
import { container } from '@/infrastructure/bootstrap/inversify.config';
import RegistrationPresenter from '../../presentation/presenter/registration.presenter';
import TrySignInUseCase from '../../business/usecases/try-sign-in.usecase';
import TrySignUpUseCase from '../../business/usecases/try-sign-up.usecase';

container
    .bind<IAuthenticationRepository>(TYPES.AuthenticationRepository)
    .to(AuthenticationRepository)
    .inSingletonScope()
;

container
    .bind<IRegistrationPresenter>(TYPES.RegistrationPresenter)
    .to(RegistrationPresenter)
    .inSingletonScope()
;

container
    .bind<RegistrationController>(TYPES.RegistrationController)
    .to(RegistrationController)
    .inSingletonScope()
;


container
    .bind<LoginPresenter>(TYPES.LoginPresenter)
    .to(LoginPresenter)
    .inSingletonScope()
;

container
    .bind<LoginController>(TYPES.LoginController)
    .to(LoginController)
    .inSingletonScope()
;

container
    .bind<TrySignInUseCase>(TYPES.TrySignInUseCase)
    .to(TrySignInUseCase)
    .inTransientScope()
;

container
    .bind<TrySignUpUseCase>(TYPES.TrySignUpUseCase)
    .to(TrySignUpUseCase)
    .inTransientScope()
;

