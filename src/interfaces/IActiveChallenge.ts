import { Document, ObjectId } from "mongoose"
import ICard from "./ICard"

export default interface IActiveChallenge extends Partial<Document> {
    coach: ObjectId
    challenge: ObjectId
    participants: ObjectId[]
    startDate: Date
    cards: IActiveCard[]
}

export interface IActiveCard {
    member: ObjectId
    card: ObjectId
    challengeDay: number
    coins: number
    answerValue: string
}