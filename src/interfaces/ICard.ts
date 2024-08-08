import { Document, ObjectId } from 'mongoose';

export default interface ICard extends Document {
    cardType: string;
    subType?: string;
    answers: string[];
    title: string;
    content: string;
    media: ObjectId[];
    coins: number;
    image?: string;
    coach: ObjectId;
}
