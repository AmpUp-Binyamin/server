// src\test\temporaryToken.ts
import UserController from '../controllers/UserController';
import createToken from '../middleware/createToken';
export default class tokenTemporary {
  static userController = new UserController();

  static async coachToken(): Promise<string | undefined> {
    let user = (await this.userController.read({ status: 'Coach' }))[0];
    if (user._id)
      return createToken({ userId: String(user._id), userPermission: 'coach' });
  }
}
