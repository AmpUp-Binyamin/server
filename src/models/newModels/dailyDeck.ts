import mongoose, { Schema, Document } from 'mongoose';
import { IDailyDeck } from './interfaces/IDailyDeck';

const dailyDeckSchema = new Schema<IDailyDeck>({
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
    coach: { type: Schema.Types.ObjectId, ref: 'Coach', required: true }
});

export default mongoose.model<IDailyDeck>('DailyDeck', dailyDeckSchema);
