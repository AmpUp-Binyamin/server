import mongoose from "mongoose";
import IChallenge from "../interfaces/IChallenge";
import IStoreItem from "../interfaces/IStoreItem";
import ICard from "../interfaces/ICard";
import IMedia from "../interfaces/IMedia";

const storeItemSchema = new mongoose.Schema<IStoreItem>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    coins: {
        type: Number,
        required: true,
    },
    daysToExpiry: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
})

const mediaSchema = new mongoose.Schema<IMedia>({
    type: {
        type: String,
        required: true,
        enum: ["image", "video", "audio", "document"]
    },
    fileName: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    }
})


const cardSchema = new mongoose.Schema<ICard>({
    day: {
        type: Number,
        required: true,
    },
    cardOrder: {
        type: Number,
        required: true,
    },
    cardType: {
        type: String,
        required: true,
    },
    subType: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    media: mediaSchema,
    coins: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    drawProbability: {
        type: Number,
    },
    winProbability: {
        type: Number,
    },
})



const challengeSchema = new mongoose.Schema<IChallenge>({
    challengeName: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    subDescription: {
        type:String,
        required: true,
    },
    duration: {
        type:Number,
        required: true,
    },
    tags: [{
        type:String,
        required: true,
    }],
    isPublic: {
        type:Boolean,
        required: true,
    },
    isTemplate: {
        type:Boolean,
        required: true,
    },
    creator: {
        type:String,
    },
    store: [storeItemSchema],
    cards: [cardSchema],
    invited: [{
        type: String,
        required: true,
    }],
})

export default mongoose.model<IChallenge>('challenge', challengeSchema)