import UserAuth from "../../middleware/UserAuth"

export default class CoinsRequest extends UserAuth {
    challengeId:string
    cardsIds:string[]


    constructor(challengeId = '', cardsIds = []) {
        super()
        this.challengeId = challengeId
        this.cardsIds = cardsIds
    }
}