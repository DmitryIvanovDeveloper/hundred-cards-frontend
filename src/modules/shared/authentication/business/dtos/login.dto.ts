import { LoginType } from "./login.type";

export default interface LoginDTO {
    type: LoginType
    email:  string;
    phone: string;
    password: string;
}
