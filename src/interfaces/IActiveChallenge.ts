import { Document, ObjectId } from "mongoose"
import ICard from "./ICard"
import IMember from "./IMember"
import IChallenge from "./IChallenge"
import ICoach from "./ICoach"

export default interface IActiveChallenge extends Partial<Document> {
    coach: ObjectId | Partial<ICoach> | ICoach  ;
    challenge: ObjectId | Partial<IChallenge> | IChallenge
    invited: ObjectId[] | Partial<IMember>[] | IMember[]
    participants: ObjectId[] | Partial<IMember>[] | IMember[]
    startDate: Date
    cards: IActiveCard[]
}

//----sub Interface for each answered card within the running challenge
export interface IActiveCard {
    member: ObjectId
    card: ObjectId
    challengeDay: number
    coins: number
    answerValue: string
    answerMedia?: string[]
}

export interface IActiveMeida {
    type: string
    content: string
}