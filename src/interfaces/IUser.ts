// src\interfaces\IUser.ts
import { Document, Types } from "mongoose";

export interface IUserChallenge {
  challenge: Types.ObjectId;
  coach: Types.ObjectId;
  isActive: boolean;
  spentCoins: number;
  earnedCoins: number;
  prizes: Types.ObjectId[];
  joinDate?: Date;
  feed: {
    sender: Types.ObjectId;
    date: Date;
    message: string;
    isThanks: boolean;
  }[];
  lastSeen: Date;
  receivedThanks: {
    sender: Types.ObjectId;
    date: Date;
  }[];
}

export interface IUser extends Partial<Document> {
  status: "User" | "Coach";
  fullName: string;
  email: string;
  phone?: string;
  image?: string;
  motto?: string;
  link?: string;
  joinDate?: Date;
  lastSeen?: Date;
  linksToSocialNetwork?: string[];
  challenges?: IUserChallenge[];
  coaches: Types.ObjectId[];
  isActive: boolean;
}
