import mongoose, { Schema, Document } from 'mongoose';
import { IStore } from './interfaces/IStore';

const storeSchema = new Schema<IStore>({
    storeName: { type: String, required: true },
    prizes: [{ type: Schema.Types.ObjectId, ref: 'Prize' }],
    coach: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<IStore>('Store', storeSchema);
