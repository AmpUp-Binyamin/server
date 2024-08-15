// src\models\UserModel.ts
import mongoose, { Schema } from 'mongoose';
import { IUser, IUserChallenge } from '../interfaces/IUser';

const userChallengeSchema = new Schema<IUserChallenge>({
    challenge: { type: Schema.Types.ObjectId, ref: 'Challenge', required: true },
    coach: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, required: true , default: true},
    spentCoins: { type: Number, required: true },
    earnedCoins: { type: Number, required: true },
    prizes: [{ type: Schema.Types.ObjectId, ref: 'Prize' }],
    joinDate: { type: Date },
    feed: [{
        sender: { type: Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, required: true },
        message: { type: String, required: true },
        isThanks: { type: Boolean, required: true }
    }],
    lastSeen: { type: Date, required: true },
    receivedThanks: [{
        sender: { type: Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, required: true }
    }]
});

const userSchema = new Schema<IUser>({
    status: { type: String, enum: ['User', 'Coach'], required: true , default: 'User'},
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    image: String,
    motto: String,
    link: String,
    joinDate: { type: Date },
    lastSeen: { type: Date },
    linksToSocialNetwork: [String],
    challenges: [userChallengeSchema],
    coaches: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true, required: true },

});

export default mongoose.model<IUser>('User', userSchema);
