import { Document, ObjectId } from "mongoose"
import INotifications from "./INotifications"
import IChallenge from "./IChallenge"
import IMemberItem from "./IMemberItem";
import { IMyCoins } from "../models/MemberModel";

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
  myCoins: IMyCoins[];
  notifications: INotifications[];
}
