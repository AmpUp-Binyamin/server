import { Document, ObjectId } from 'mongoose';

export default interface IStore extends Document {
    storeName: string;
    prizes: ObjectId[];
    coach: ObjectId;
    isActive: boolean;
}
