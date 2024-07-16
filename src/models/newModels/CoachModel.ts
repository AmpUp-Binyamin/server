import mongoose, { Schema, Document } from 'mongoose';
import { ICoach } from './interfaces/ICoach';

const coachSchema = new Schema<ICoach>({
    fullName: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phoneNumber: { type: String, required: true },
    image: String,
    link: String,
    joinDate: { type: Date, required: true },
    // paymentDetails: String,
    // billingHistory: [String]
});

export default mongoose.model<ICoach>('Coach', coachSchema);
