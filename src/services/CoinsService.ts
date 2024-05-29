import activeChallengeController from "../controllers/ActiveChallengeController";
import CoinsRequest from "../dto/coins/CoinsRequest";

export default class CoinsService {

    static activeChallengeController = new activeChallengeController();

    // static async getsingelMember(id: string): Promise<IMember | null> {
    //     return await this.controller.readOne(id)
    // }

    static async addCoins(data:CoinsRequest):Promise<number>{
        // memberId:string, challengeId:string, cardsIds:string[] 
        let activeChallenge = await this.activeChallengeController.read({challenge:data.challengeId})
        console.log(activeChallenge);
        
        return 1
    }


}