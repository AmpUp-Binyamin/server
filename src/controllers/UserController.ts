// import { ObjectId } from 'mongoose';
import IUser from '../interfaces/IUser';
import UserModel from './UserModel'

export default class UserController {

    static async create(user: IUser): Promise<IUser> {
        return await UserModel.create(user)
    }

    static read() { }
    static async readOne(id: string): Promise<IUser | null> {
        return await UserModel.findById(id)
    }
    static update() { }
    static del() { }
}
