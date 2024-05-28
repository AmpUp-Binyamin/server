import { Document } from "mongoose"
import Permission from "../types/Permission"

export default interface IMember extends Partial<Document> {
    fullName: string
    email: string
    permission: Permission
    password?: string
}