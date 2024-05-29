import { ObjectId } from "mongoose";
import ChallengeController from "../controllers/ChallengeController";
import IChallenge from "../interfaces/IChallenge";


export default class ChallengeService {
    static controller = new ChallengeController()

    static async getOneChallenge(id:string): Promise<IChallenge | null>{
        let challenge = this.controller.readOneWithPopulate(id, {member: 'img ', coach: 'fullName picture title'}, 'challengeName coverImage subDescription invited')
        return challenge
        
    }
}