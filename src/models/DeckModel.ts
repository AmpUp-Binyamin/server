// src\models\DeckModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IDeck, IDeckCard } from '../interfaces/IDeck';

const deckCardSchema = new Schema<IDeckCard>({
  card: { type: Schema.Types.ObjectId, ref: 'Card', required: true },
  day: { type: Number, required: true },
  cardOrder: { type: Number, required: true },
});

const deckSchema = new Schema<IDeck>({
  deckName: { type: String, required: true },
  description: { type: String, required: true },
  drawProbability: Number,
  winProbability: Number,
  cards: [deckCardSchema],
  store: { type: Schema.Types.ObjectId, ref: 'Store' },
  coach: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: true, required: true },
});

export default mongoose.model<IDeck>('Deck', deckSchema);
