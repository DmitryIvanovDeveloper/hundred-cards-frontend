import { ref } from "vue";
import { RegistrationType } from "../../business/dtos/registration-type";
import RegistrationDTO from "../../business/dtos/registration.dto";
import { inject } from "inversify";
import { TYPES } from "../../types";
import TrySignInUseCase from "../../business/usecases/try-sign-in.usecase";
import TrySignUpUseCase from "../../business/usecases/try-sign-up.usecase";

export default class RegistrationController {

    constructor(
        @inject(TYPES.TrySignUpUseCase)
        private readonly _trySignUpUseCase: TrySignUpUseCase
    ) {}
    
    public form = ref<RegistrationDTO>({
        type: RegistrationType.Business,
        company: '',
        name: '',
        lasName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    public readonly isLoading = ref<boolean>(false);

    public updateCompany = (company: string) => {
        this.form.value.company = company;
    }

    public updateName = (name: string) => {
        this.form.value.name = name;
    }

    public updateLastName = (lastName: string) => {
        this.form.value.lasName = lastName;
    }

    public updateEmail = (email: string) => {
        this.form.value.email = email;
    }

    public updatePhone = (phone: string) => {
        this.form.value.phone = phone;
    }

    public updatePassword = (password: string) => {
        this.form.value.password = password;
    }

    public updateConfirmPassword = (confirmPassword: string) => {
        this.form.value.confirmPassword = confirmPassword;
    }

    public updateType = (type: RegistrationType) => {
        this.form.value.type = type;
    }

    public trySignUp = async (): Promise<void> => {
       await this._trySignUpUseCase.execute(this.form.value);
    }
}
