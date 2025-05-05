import { injectable } from 'inversify';
import IRegistrationPresenter from '../../business/plugins/registration.presenter.interface';



@injectable()
export default class RegistrationPresenter implements IRegistrationPresenter {
  
    public labels = {
        title: 'Регистрация',
    }
}
