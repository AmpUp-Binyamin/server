// src\models\CardModel.ts
import mongoose, { Schema, } from "mongoose";
import ICard from "../interfaces/ICard";

const cardSchema = new Schema<ICard>({
  cardType: { type: String, required: true },
  subType: String,
  title: { type: String, required: true },
  content: { type: String, required: true },
  media: [{ type: Schema.Types.ObjectId, ref: "Media" }],
  coins: { type: Number, required: true },
  image: String,
  coach: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isActive: { type: Boolean, default: true, required: true },
});

export default mongoose.model<ICard>("Card", cardSchema);
