import { Document, ObjectId } from 'mongoose';

export interface IDeckCard {
    card: ObjectId;
    day: number;
    cardOrder: number;
}

export interface IDeck extends Document {
    deckName: string;
    description: string;
    drawProbability?: number;
    winProbability?: number;
    cards: IDeckCard[];
    store: ObjectId;
    coach: ObjectId;
}
