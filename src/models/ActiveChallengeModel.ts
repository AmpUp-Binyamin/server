import mongoose, { Mongoose, SchemaTypes } from 'mongoose'
import IActiveChallenge, { IActiveCard } from '../interfaces/IActiveChallenge';
import IMedia from '../interfaces/IMedia';

const activeMediaSchema = new mongoose.Schema<IMedia>({
    type: {
        type: String,
        required: true,
        enum: ["image", "video", "audio", "document", "other"]
    },
    fileName: {
        type: String,
        required: true,
        unique: true
    },
    path: {
        type: String,
        required: true,
        unique: true
    },
    size: {
        type: String,
    }
})


const activeCardSchema = new mongoose.Schema<IActiveCard>({
    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "member",
        required: true
    },
    card: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    challengeDay: {
        type: Number,
        required: true
    },
    coins: {
        type: Number,
        required: true
    },
    answerValue: {
        type: String,
        required: true
    },
    answerMedia: [activeMediaSchema]

})

const ActiveChallengeSchema = new mongoose.Schema<IActiveChallenge>({
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coach",
        required: true
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "challenge",
        required: true
    },
    invited: [{
        type: SchemaTypes.ObjectId,
        ref: 'member',
        required: true,
    }],

    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "member"
    }],
    startDate: {
        type: Date,
        required: true
    },
    cards: [activeCardSchema]
})

export default mongoose.model<IActiveChallenge>('activeChallenge', ActiveChallengeSchema)