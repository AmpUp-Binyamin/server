import { Document, ObjectId } from 'mongoose';

export interface IStore extends Document {
    prizes: ObjectId[];
    coach: ObjectId;
}
