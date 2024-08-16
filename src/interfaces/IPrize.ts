// src\interfaces\IPrize.ts
import { Document, Types } from 'mongoose';

export default interface IPrize extends Document {
  name: string;
  description: string;
  image: string;
  price: number;
  daysToExpiry: number;
  daysToAvailability: number;
  quantity: number;
  cardType: string;
  isActive: boolean;
  coach: Types.ObjectId;
}
