import { Document, ObjectId } from "mongoose"
import INotifications from "./INotifications"
import IChallenge from "./IChallenge"
import IMemberItem from "./IMemberItem";

export default interface IMember extends Partial<Document> {
  fullName: string;
  email: string;
  phone?: number;
  img?: string;
  motto?: string;
  link?: string;
  linksToSocialNetwork?: string[];
  myChallenge: ObjectId[] | IChallenge[]
  myItems?: IMemberItem[];
  coins: number;
  notifications: INotifications[];
}
