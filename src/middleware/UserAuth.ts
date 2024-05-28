import IMember from "../interfaces/IMember"
import UserService from "../services/UserService"
import Permission from "../types/Permission"

export default abstract class UserAuth {
    userId: string
    userPermission: Permission
    user?: IMember | null

    constructor() {
        this.userId = ''
        this.userPermission = 'user'
    }

    async getFullData?(): Promise<IMember | null> {
        if (this.user) return this.user;
        const user = await UserService.getSingleUser(this.userId);
        this.user = user;
        return user;
    }
}