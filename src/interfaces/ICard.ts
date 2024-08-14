import { Document, ObjectId } from 'mongoose';

export default interface ICard extends Document {
    cardType: string;
    subType?: string;
    title: string;
    content: string;
    media: ObjectId[];
    coins: number;
    image?: string;
    coach: ObjectId;
    isActive: boolean;
}
