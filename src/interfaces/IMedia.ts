// src\interfaces\IMedia.ts
import { Document, Types } from 'mongoose';

export default interface IMedia extends Document {
  fileName: string;
  url: string;
  size: number;
  type: string;
  coach: Types.ObjectId;
}
