import { Document, ObjectId } from "mongoose"
import ICard from "./ICard"

export default interface IActiveChallenge extends Partial<Document> {
    coach: ObjectId
    challenge: ObjectId
    participants: ObjectId[]
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