import activeChallengeController from "../controllers/ActiveChallengeController"
import AddActiveChallengeRequest from "../dto/activeChallenge/AddActiveChallengeRequest"
import IActiveChallenge from "../interfaces/IActiveChallenge"

export default class ActiveChallegeService {
    static controller = new activeChallengeController()

    static async getSingleActiveChallenge(id: string): Promise<IActiveChallenge | null> {
        return await this.controller.readOne(id)
    }
    static async createNewActiveChallenge(data: AddActiveChallengeRequest): Promise<IActiveChallenge | null> {
        let newActiveChallenge: IActiveChallenge = {
            coach: data.coach,
            challenge: data.challenge,
            participants: data.participants,
            startDate: data.startDate,
            cards: data.cards,

        }
        return await this.controller.create(newActiveChallenge)
    }

}