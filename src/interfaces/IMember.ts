import { Document, ObjectId } from "mongoose"
import INotifications from "./INotifications"

export default interface IMember extends Partial<Document> {
    fullName: string
    email: string
    phone:number
    img?:string
    motto?:string
    link?:string
    linksToSocialNetwork:string[]
    myChallenge:ObjectId[] 
    coins:number
    notifications:INotifications[]
}