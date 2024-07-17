import { Document, ObjectId } from 'mongoose';

export interface IStore extends Document {
    storeName: string;
    prizes: ObjectId[];
    coach: ObjectId;
}
