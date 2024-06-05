import UserAuth from "../../middleware/UserAuth"

export default class CoinsRequest extends UserAuth {
    activeChallengeId:string


    constructor(activeChallengeId = '') {
        super()
        this.activeChallengeId = activeChallengeId
    }
}