import { ref } from "vue";
import LoginDTO from "../../business/dtos/login.dto";
import { LoginType } from "../../business/dtos/login.type";
import { inject } from "inversify";
import { TYPES } from "../../types";
import TrySignInUseCase from "../../business/usecases/try-sign-in.usecase";
import Result from "@/infrastructure/helpers/result";

export default class LoginController {

    constructor(
        @inject(TYPES.TrySignInUseCase)
        private readonly _trySignInUseCase: TrySignInUseCase
    ) {}

    public form = ref<LoginDTO>({
        type: LoginType.Email,
        email: "",
        phone: "",
        password: ""
    })

    public readonly isLoading = ref<boolean>(false);

    public updateEmail = (email: string): void => {
        this.form.value.email = email;
    }

    public updatePhone = (phone: string): void => {
        this.form.value.phone = phone;
    }

    public updatePassword = (password: string): void => {
        this.form.value.password = password;
    }

   
    public updateType = (type: LoginType): void => {
        this.form.value.type = type;
    }

    public tryLogin = async (): Promise<Result<void>> => {
        this.isLoading.value = true;
        const result = await this._trySignInUseCase.execute(this.form.value);
        this.isLoading.value = false;

        return result;
    }
}
