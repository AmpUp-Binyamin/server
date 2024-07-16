import { Document, ObjectId } from 'mongoose';

export interface IDeck extends Document {
    deckName: string;
    description?: string;
    // todo: set daily deck by day?
    dailyDecks: ObjectId[];
    store: ObjectId;
    coach: ObjectId;
}
