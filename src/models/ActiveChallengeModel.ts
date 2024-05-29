import mongoose, { Mongoose } from 'mongoose'
import IActiveChallenge, { IActiveCard, IActiveMeida } from '../interfaces/IActiveChallenge';

const activeMediaSchema = new mongoose.Schema<IActiveMeida>({
    type: {
        type: String
    },
    content: {
        type: String
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
        ref: "card",
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
    participants: [{
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "member"
        }
    }],
    startDate: {
        type: Date,
        required: true
    },
    cards: [activeCardSchema]
})

export default mongoose.model<IActiveChallenge>('activeChallenge', ActiveChallengeSchema)