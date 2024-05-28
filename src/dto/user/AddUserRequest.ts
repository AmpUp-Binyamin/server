export default class AddUserRequest{
    fullName : string
    email: string

    constructor(fn ='', email=''){
        this.fullName=fn
        this.email=email
    }
}
