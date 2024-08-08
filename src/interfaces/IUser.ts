import { Document, ObjectId } from 'mongoose';

export interface IUserChallenge {
    challenge: ObjectId;
    coach: ObjectId;
    isActive: boolean;
    spentCoins: number;
    earnedCoins: number;
    prizes: ObjectId[];
    joinDate?: Date;
    feed: {
        sender: ObjectId;
        date: Date;
        message: string;
        isThanks: boolean;
    }[];
    lastSeen: Date;
    receivedThanks: {
        sender: ObjectId;
        date: Date;
    }[];
}

export interface IUser extends Document {
    status: 'User' | 'Coach';
    fullName: string;
    email: string;
    phone: string;
    image?: string;
    motto?: string;
    link?: string;
    joinDate: Date;
    lastSeen: Date;
    linksToSocialNetwork: string[];
    challenges: IUserChallenge[];
    coaches: ObjectId[];
}
