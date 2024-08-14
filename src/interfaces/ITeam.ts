import { Document, ObjectId } from 'mongoose';

export default interface ITeam extends Document {
    teamName: string;
    members: ObjectId[];
    coach: ObjectId;
    isActive: boolean;
}
