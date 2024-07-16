import mongoose, { Schema, Document } from 'mongoose';
import { IDeck } from './interfaces/IDeck';

const deckSchema = new Schema<IDeck>({
    deckName: { type: String, required: true },
    description: String,
    dailyDecks: [{ type: Schema.Types.ObjectId, ref: 'DailyDeck' }],
    store: { type: Schema.Types.ObjectId, ref: 'Store' },
    coach: { type: Schema.Types.ObjectId, ref: 'Coach', required: true }
});

export default mongoose.model<IDeck>('Deck', deckSchema);
