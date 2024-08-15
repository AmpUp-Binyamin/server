// src\interfaces\IFeedBack.ts
import { Document } from "mongoose"
export default interface IFeedBack extends Document {
    subject: string
    name : string
    email: string
    message?: string
}