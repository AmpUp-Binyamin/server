// src\interfaces\IAnswer.ts
import { Document, Types } from "mongoose";

export default interface IAnswer extends Document {
  challenge: Types.ObjectId;
  card: Types.ObjectId;
  day: number;
  cardOrder: number;
  user: Types.ObjectId;
  answerValue: string;
  answerMedia?: Types.ObjectId;
  isActive: boolean;
}
