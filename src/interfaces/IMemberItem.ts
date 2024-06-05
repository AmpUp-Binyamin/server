import { ObjectId } from "mongodb";



export default interface IMemberItem {
    cardId: ObjectId | string
    activeChallengeId: ObjectId | string
    isActive?: boolean
    activeDate?: Date
}