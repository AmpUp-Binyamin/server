import { Document } from "mongoose"
import Permission from "../types/Permission"

export default interface IUser extends Document {
    fullName: string
    email: string
    permission: Permission
    password?: string
}