import { Document, ObjectId } from 'mongoose';

export interface ITeam extends Document {
    teamName: string;
    members: ObjectId[];
    coach: ObjectId;
}
