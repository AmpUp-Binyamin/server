// interfaces/IAnswer.ts
import { Document, ObjectId } from "mongoose";

export default interface IAnswer extends Document {
  challenge: ObjectId;
  card: ObjectId;
  day: number;
  cardOrder: number;
  user: ObjectId;
  answerValue: string;
  answerMedia?: ObjectId;
  isActive: boolean;
}
