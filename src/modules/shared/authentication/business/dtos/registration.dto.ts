import { RegistrationType } from "./registration-type";

export default interface RegistrationDTO {
    type: RegistrationType
    company: string;
    name: string;
    lasName: string;
    email:  string;
    phone: string;
    password: string;
    confirmPassword: string;
}
