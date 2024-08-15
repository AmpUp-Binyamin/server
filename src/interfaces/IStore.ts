// src\interfaces\IStore.ts
import { Document, Types } from 'mongoose';

export default interface IStore extends Document {
    storeName: string;
    prizes: Types.ObjectId[];
    coach: Types.ObjectId;
    isActive: boolean;
}
