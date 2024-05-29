import activeChallengeController from "../controllers/ActiveChallengeController"
import AddActiveChallengeRequest from "../dto/activeChallenge/AddActiveChallengeRequest"
import IActiveChallenge from "../interfaces/IActiveChallenge"

export default class ActiveChallegeService {
    static controller = new activeChallengeController()

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
}

