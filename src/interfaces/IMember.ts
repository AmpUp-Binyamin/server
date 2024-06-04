import { Document, ObjectId } from "mongoose"
import INotifications from "./INotifications"
import IChallenge from "./IChallenge"
import IActiveChallenge from "./IActiveChallenge";

export default interface IMember extends Partial<Document> {
  fullName: string;
  email: string;
  phone?: number;
  img?: string;
  motto?: string;
  link?: string;
  linksToSocialNetwork?: string[];
  myChallenge: ObjectId[] | IChallenge[]; //NEEDS TO BE ACTIVE CHALLENGE
  myActiveChallenge: ObjectId[] | IActiveChallenge[]
  myInvites: ObjectId[] | IActiveChallenge[];//NEEDS TO BE ACTIVE CHALLENGE
  myItems?: ObjectId[];
  coins: number;
  notifications: INotifications[];
}
