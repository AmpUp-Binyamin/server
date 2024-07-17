import mongoose, { Schema, Document } from 'mongoose';
import { ITeam } from './interfaces/ITeam';

const teamSchema = new Schema<ITeam>({
    teamName: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    coach: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<ITeam>('Team', teamSchema);
