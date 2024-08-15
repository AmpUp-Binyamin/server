// src\interfaces\ITeam.ts
import { Document, Types } from 'mongoose';

export default interface ITeam extends Document {
    teamName: string;
    members: Types.ObjectId[];
    coach: Types.ObjectId;
    isActive: boolean;
}
