// src\interfaces\ICard.ts
import { Document, Types } from 'mongoose';

export default interface ICard extends Document {
  cardType: string;
  subType?: string;
  title: string;
  content: string;
  media: Types.ObjectId[];
  coins: number;
  image?: string;
  coach: Types.ObjectId;
  isActive: boolean;
}
