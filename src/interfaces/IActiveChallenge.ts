import { Document } from "mongoose"
import { ObjectId } from "mongodb"
import ICard from "./ICard"
import IMember from "./IMember"

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

export interface IActiveMeida {
    type: string
    content: string
}