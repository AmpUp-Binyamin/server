import { Document, ObjectId } from 'mongoose';

export interface IMedia extends Document {
    fileName: string;
    link: string;
    size: string;
    type: string;
    coach: ObjectId;
}
