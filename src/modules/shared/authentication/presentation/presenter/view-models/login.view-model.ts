export default interface ILoginViewModel {
    type: 'email'| 'phone',
    phoneNumber: string,
    email: string,
    password: string,
    isRemember: boolean
}