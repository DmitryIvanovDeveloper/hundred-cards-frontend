import { injectable } from 'inversify';
import ILoginPresenter from '../../business/plugins/login.presenter.interface';


@injectable()
export default class LoginPresenter implements ILoginPresenter {
    public readonly labels = {
        title: 'Авторизация',
        email: {
            label: "Email (личный)",
            required: true,
            placeholder: 'email@example.com'
        },
        phone: {
            label: "Телефон",
            required: true,
            placeholder: '+7 (___)___-__-_'
        },
        password: {
            label: "Пароль",
            required: true,
            placeholder: ''
        },
        confirm: 'Войти',
        notRegistered: {
            title: 'Еще не зареистрированны?',
            goto: "Зарегистрироваться"
        },
        loginType: {
            phone: 'Телефон',
            email: 'Email'
        }
    }
}
