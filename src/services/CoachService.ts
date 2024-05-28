import CoachController from "../controllers/CoachController";
import { CreateCoachRequest } from "../dto/coach/CoachRequest";
import ICoach from "../interfaces/ICoach";


export default class CoachService {
    static controller = new CoachController()

    static async getSingleCoach(id: string): Promise<ICoach | null> {
        return await this.controller.readOne(id)
    }

    static async createNewCoach(data: CreateCoachRequest): Promise<ICoach | null> {
        let newCoach: ICoach = {
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            picture: data.picture,
            link: data.link,
            myChallenges: data.myChallenges
        }
        return await this.controller.create(newCoach)
    }
}