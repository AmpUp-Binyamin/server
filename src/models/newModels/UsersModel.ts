import mongoose, { Schema, Document } from 'mongoose';
import { IUser, IUserChallenge } from './interfaces/IUser';

const userChallengeSchema = new Schema<IUserChallenge>({
    challenge: { type: Schema.Types.ObjectId, ref: 'Challenge', required: true },
    coach: { type: Schema.Types.ObjectId, ref: 'Coach', required: true },
    active: { type: Boolean, required: true },
    coins: { type: Number, required: true },
    prizes: [{ type: Schema.Types.ObjectId, ref: 'Prize' }],
    lastSeen: { type: Date, required: true },
    joinDate: { type: Date, required: true }
});

const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: Number,
    image: String,
    motto: String,
    link: String,
    joinDate: { type: Date, required: true },
    linksToSocialNetwork: [String],
    challenges: [userChallengeSchema],
    coaches: [{ type: Schema.Types.ObjectId, ref: 'Coach' }]
});

export default mongoose.model<IUser>('User', userSchema);
