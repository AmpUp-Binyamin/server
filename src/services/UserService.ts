import UserController from "../controllers/UserController";
import AddUserRequest from "../dto/user/AddUserRequest";
import IUser from "../interfaces/IUser";




export default class UserService {

    static async createNewUser(request: AddUserRequest){//: Promise<IUser | null> {
        console.log(request);
        
        // return await UserController.create(request);
    }

    static async getSingleUser(id: string): Promise<IUser | null> {
        return await UserController.readOne(id)
    }


}