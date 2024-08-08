import { Document, ObjectId } from 'mongoose';

export default interface IMedia extends Document {
    fileName: string;
    link: string;
    size: string;
    type: string;
    coach: ObjectId;
}
