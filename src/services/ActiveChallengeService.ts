import activeChallengeController from "../controllers/ActiveChallengeController"
import MemberController from "../controllers/MemberControllers"
import AddActiveChallengeRequest from "../dto/activeChallenge/AddActiveChallengeRequest"
import { RandomNumberGenerator } from "../helpers/luck"
import IActiveChallenge from "../interfaces/IActiveChallenge"

export default class ActiveChallegeService {
    static controller = new activeChallengeController()
    static RandomGenerator = new RandomNumberGenerator()
static memberController = new MemberController()
    static async getSingleActiveChallenge(id: string): Promise<IActiveChallenge | null> {
        return await this.controller.readOne(id)
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
            participants: [],
            startDate: data.startDate,
            cards: []
        }
        return await this.controller.create(newActiveChallenge)
    }



    static async loveCard(challengeId: string): Promise<any> {

        let challenge = await this.controller.readOne(challengeId ,'participants')
        if (!challenge) throw { code: 400, message: "go to hell!!!" };
       let num=  challenge.participants.length
      let user=   challenge.participants[this.RandomGenerator.getRandom(0, num -1 )];

    
        return await  this.memberController.readOne((user))
      }

      
}



