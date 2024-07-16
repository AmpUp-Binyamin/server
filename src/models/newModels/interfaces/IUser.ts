import { Document, ObjectId } from 'mongoose';

export interface IUserChallenge {
    challenge: ObjectId;
    coach: ObjectId;
    active: boolean;
    coins: number;
    prizes: ObjectId[];
    lastSeen: Date;
    joinDate: Date;
}

export interface IUser extends Document {
    fullName: string;
    email: string;
    phone?: number;
    image?: string;
    motto?: string;
    link?: string;
    joinDate: Date;
    linksToSocialNetwork: string[];
    challenges: IUserChallenge[];
    coaches: ObjectId[];
}
