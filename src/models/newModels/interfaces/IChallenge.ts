// interfaces/IChallenge.ts
import { Document, ObjectId } from 'mongoose';

export interface IChallenge extends Document {
    challengeName: string;
    shortDescription?: string;
    longDescription?: string;
    team: ObjectId;
    deck: ObjectId;
    startDate: Date;
    coach: ObjectId;
}
