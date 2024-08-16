// src\models\AnswerModel.ts
import mongoose, { Schema } from 'mongoose';
import IAnswer from '../interfaces/IAnswer';

const answerSchema = new Schema<IAnswer>({
  challenge: { type: Schema.Types.ObjectId, ref: 'Challenge', required: true },
  card: { type: Schema.Types.ObjectId, ref: 'Card', required: true },
  day: { type: Number, required: true },
  cardOrder: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  answerValue: { type: String, required: true },
  answerMedia: { type: Schema.Types.ObjectId, ref: 'Media' },
  isActive: { type: Boolean, default: true, required: true },
});

export default mongoose.model<IAnswer>('Answer', answerSchema);
