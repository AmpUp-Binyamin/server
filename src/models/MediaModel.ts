// src\models\MediaModel.ts
import mongoose, { Schema } from "mongoose";
import IMedia from "../interfaces/IMedia";

const mediaSchema = new Schema<IMedia>({
  fileName: { type: String, required: true },
  link: { type: String, required: true },
  size: { type: String, required: true },
  type: { type: String, required: true },
  coach: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<IMedia>("Media", mediaSchema);
