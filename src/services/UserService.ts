import UserController from "../controllers/UserController";
import AddUserRequest from "../dto/user/AddUserRequest";
import IUser from "../interfaces/IUser";

export default class UserService {
    static controller = new UserController()

    static async getSingleUser(id: string): Promise<IUser | null> {
        return await this.controller.readOne(id)
    }
    static async createNewUser(data : AddUserRequest): Promise<IUser | null> {
        let newUser : IUser = {
            fullName: data.fullName,
            email: data.email,
            permission: "user",
        }
        return await this.controller.create(newUser)
    }

}