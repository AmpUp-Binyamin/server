// src\interfaces\IDeck.ts
import { Document, Types } from 'mongoose';

export interface IDeckCard {
  card: Types.ObjectId;
  day: number;
  cardOrder: number;
}

export interface IDeck extends Document {
  deckName: string;
  description: string;
  drawProbability?: number;
  winProbability?: number;
  cards: IDeckCard[];
  store: Types.ObjectId;
  coach: Types.ObjectId;
  isActive: boolean;
}
