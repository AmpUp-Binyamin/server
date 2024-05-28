import { Document, ObjectId } from "mongoose"
import Permission from "../types/Permission"

export default interface INotifications extends Partial<Document> {
    challenge: ObjectId | object | void
    type:string
    title:string
    content:string
    sender:ObjectId
}