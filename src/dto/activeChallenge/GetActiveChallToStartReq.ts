import IActiveChallenge from "../../interfaces/IActiveChallenge"
import IMember from "../../interfaces/IMember"

interface Challenge {
        challengeName: string
        coverImg: string
        subDescription: string
        duration: number
}

interface Coach {
    fullName: string
    picture: string
    title: string
}

export default class GetActiveChallToStartReq  {

    startDate: Date
    participants: IMember[]
    challenge : Challenge
    coach: Coach

    constructor(startDate: Date, participants: IMember[],challenge :Challenge, coach: Coach){
        this.startDate = startDate
        this.participants = participants
        this.challenge = challenge
        this.coach = coach
    }

}