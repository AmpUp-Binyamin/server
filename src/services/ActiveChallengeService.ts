import activeChallengeController from "../controllers/ActiveChallengeController"
import AddActiveChallengeRequest from "../dto/activeChallenge/AddActiveChallengeRequest"
import { FutureDateCalc } from "../helpers/FutureDateCalc"
import IActiveChallenge from "../interfaces/IActiveChallenge"
import IChallenge from "../interfaces/IChallenge"
import IMember from "../interfaces/IMember"


export default class ActiveChallegeService {
    static controller = new activeChallengeController()

    static async getSingleActiveChallenge(id: string): Promise<IActiveChallenge | null> {
        return await this.controller.readOne(id)
    }

    static async getActiveChallengeToStartScreen(id: string)  {
        console.log(id);
        
        let challenge: IActiveChallenge| null = await this.controller.readOneWithPopulate(id, {participants: 'img', coach: 'fullName picture title', challenge: 'challengeName coverImage subDescription duration'}, 'startDate participants')
        if (!challenge) return null
        if (!('_id' in challenge.challenge)) return null;
        const futureDate : Date = FutureDateCalc(challenge.startDate, challenge.challenge.duration as number)
        console.log(futureDate)
        console.log({...challenge, futureDate});
        
        // const par  = challenge?.participants.length
        return {...challenge, futureDate}
    }

    static async createNewActiveChallenge(data: any): Promise<IActiveChallenge> {
        if (!data.challenge) {
            throw { code: 400, msg: "challenge not found" }
        }
        if (!data.startDate) {
            throw { code: 400, msg: "start date not found" }
        }
        let newActiveChallenge: IActiveChallenge = {
            coach: data.userId,
            challenge: data.challenge,
            invited: [],
            participants: [],
            startDate: data.startDate,
            cards: []
        }
        return await this.controller.create(newActiveChallenge)
    }
}

