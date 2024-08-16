// src\services\UserService.ts
import { Types } from 'mongoose';
import UserController from '../controllers/UserController';
import AddUserRequest from '../dto/user/AddUserRequest';
import { IUser } from '../interfaces/IUser';

export default class UserService {
  static controller = new UserController();

  static async getSingleUser(id: string): Promise<IUser | null> {
    let user = await this.controller.readOne(id);
    if (!user) throw { code: 404, message: 'User not found' };
    return user;
  }
  static async createNewUser(data: AddUserRequest): Promise<IUser | null> {
    const coachId = new Types.ObjectId(data.userId);

    let newUser: IUser = {
      fullName: data.fullName,
      email: data.email,
      status: 'User',
      coaches: [coachId],
      isActive: true,
    };

    return await this.controller.create(newUser);
  }
}
