// src\models\ChallengeModel.ts
import mongoose, { Schema } from 'mongoose';
import IChallenge from '../interfaces/IChallenge';

const challengeSchema = new Schema<IChallenge>({
  challengeName: { type: String, required: true },
  shortDescription: String,
  longDescription: String,
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  deck: { type: Schema.Types.ObjectId, ref: 'Deck', required: true },
  startDate: { type: Date, required: true },
  coach: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: true, required: true },
});

export default mongoose.model<IChallenge>('Challenge', challengeSchema);
