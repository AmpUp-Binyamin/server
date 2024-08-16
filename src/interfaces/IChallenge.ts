// src\interfaces\IChallenge.ts
import { Document, Types } from 'mongoose';

export default interface IChallenge extends Document {
  challengeName: string;
  shortDescription?: string;
  longDescription?: string;
  team: Types.ObjectId;
  deck: Types.ObjectId;
  startDate: Date;
  coach: Types.ObjectId;
  isActive: boolean;
}
