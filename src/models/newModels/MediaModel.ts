import { Document, Schema } from 'mongoose';

export interface IMedia extends Document {
    fileName: string;
    link: string;
    size: string;
    type: string;
    coach: { type: Schema.Types.ObjectId, ref: 'Coach', required: true }

}
