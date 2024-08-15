// src\models\PrizeModel.ts
import mongoose, { Schema } from 'mongoose';
import  IPrize from '../interfaces/IPrize';

const prizeSchema = new Schema<IPrize>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    daysToExpiry: { type: Number, required: true },
    daysToAvailability: { type: Number, required: true },
    quantity: { type: Number, required: true },
    cardType: { type: String, required: true },
    isActive: { type: Boolean, default: true, required: true },
    coach: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<IPrize>('Prize', prizeSchema);
