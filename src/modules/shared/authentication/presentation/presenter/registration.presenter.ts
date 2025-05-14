import { injectable } from 'inversify';
import IRegistrationPresenter from '../../business/plugins/registration.presenter.interface';

@injectable()
export default class RegistrationPresenter implements IRegistrationPresenter {
  
    public labels = {
        title: 'Регистрация',
        company: {
            label: "Введите название компании",
            required: true,
            placeholder: 'OOO "Пример компании"'
        },
        name: {
            label: "Имя",
            required: true,
            placeholder: 'Введите имя'
        },
        lastName: {
            label: "Фамилия",
            required: true,
            placeholder: 'Введите фамилию'
        },
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
        confirmPassword: {
            label: "Подтверждение пароля",
            required: true,
            placeholder: ''
        },
        confirm: 'Зарегистрироваться',
        registeredAlready: {
            title: 'Уже зарегистрированы?',
            goto: "Войти"
        },
        registrationType: {
            personal: 'Для себя',
            business: 'Для бизнеса'
        }
    }
}
