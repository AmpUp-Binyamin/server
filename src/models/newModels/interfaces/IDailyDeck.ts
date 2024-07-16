import { Document, ObjectId } from 'mongoose';

export interface IDailyDeck extends Document {
    cards: ObjectId[];
    coach: ObjectId;
}
