// src\services\UserService.ts
import { Types } from 'mongoose';
import UserController from '../controllers/UserController';
import AddUserRequest from '../dto/user/AddUserRequest';
import { IUser } from '../interfaces/IUser';

type FilterableUserProperties = {
  fullName?: string;
  email?: string;
  status?: string;
  coaches?: Types.ObjectId[];
  isActive?: boolean;
};

export default class UserService {
  static controller = new UserController();

  static async getSingleUser(id: string, userId: string): Promise<IUser | null> {
    let user = await this.controller.readOne(id);
    const userObjectId = new Types.ObjectId(userId); // Convert userId to ObjectId
    if (!user || user.coaches.indexOf(userObjectId) === -1 || !user.isActive) {
      throw { code: 404, message: 'User not found or not active' };
    }
    return user;
  }

  static async createNewUser(data: AddUserRequest, userId: string): Promise<IUser | null> {
    const coachId = new Types.ObjectId(userId);

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
