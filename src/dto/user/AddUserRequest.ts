// export default class AddUserRequest{
//     fullName : string
//     email: string

//     constructor(fn:string, email:string){
//         this.fullName=fn
//         this.email=email
//     }
// }
export default interface AddUserRequest{
    fullName : string
    email: number
}