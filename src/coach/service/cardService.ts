import { ObjectId } from "mongoose";
import ChallengeController from "../../controllers/ChallengeController";
// import IChallenge from "../interfaces/IChallenge";


export default class CardService {
    static controller = new ChallengeController()

    // פונ שמקבלת פרטי אתגר לא פעיל לפי מה שצריך להציג במסך של הצטרפות לאתגר
    // בינתיים זה לא שמיש כי צריך להציג שם אתגר פעיל אבל אולי יצטרכו חלק מזה למשהו אחר
    // static async getOneChallenge(id:string): Promise<IChallenge | null>{
    //     let challenge = this.controller.readOneWithPopulate(id, {member: 'img ', coach: 'fullName picture title'}, 'challengeName coverImage subDescription invited')
    //     return challenge
    // }


    
}