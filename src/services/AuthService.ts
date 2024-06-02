import MemberController from "../controllers/MemberControllers";
import activeChallengeController from "../controllers/ActiveChallengeController"
import { ObjectId } from "mongoose";


export default class AuthService {
    static MemberController = new MemberController();
    static async checkEmail(email: string) {
        return( await this.MemberController.read({email}))[0]
    }
    static activeChallengeController = new activeChallengeController();

    static async checkActivChaleng(challenge:ObjectId) {
        return await this.activeChallengeController.read({challenge})
    }


    static async checkEmail1(email: string, fullName: string, img:string, ) {
    
        return {
          email: email,
          fullName: fullName,
          img: img,
          
        }


    }
}