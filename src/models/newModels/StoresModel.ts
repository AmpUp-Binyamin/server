import mongoose, { Schema, Document } from 'mongoose';
import { IStore } from './interfaces/IStore';

const storeSchema = new Schema<IStore>({
    prizes: [{ type: Schema.Types.ObjectId, ref: 'Prize' }],
    coach: { type: Schema.Types.ObjectId, ref: 'Coach', required: true }
});

export default mongoose.model<IStore>('Store', storeSchema);
