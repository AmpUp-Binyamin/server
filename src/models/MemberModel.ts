import mongoose from 'mongoose'
import IMember from '../interfaces/IMember'
import INotifications from '../interfaces/INotifications'

const notificationsSchema = new mongoose.Schema<INotifications>({
    challenge: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    type: {
        type: String, 
        required: true,
        enum: ["join", "sent support", "sent message"]
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isRead:{
        type: Boolean,
        required:true,
        default: false
    },
    sender: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
})

const memberSchema = new mongoose.Schema<IMember>({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    img: {
        type: String,
    },
    motto: {
        type: String,
    },
    link: {
        type: String,
    },
    linksToSocialNetwork: [{
        type: String,
        required: true
    }],
    myChallenge: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'challenge',
        required: true
    }],
    coins: {
        type: Number,
        required: true,
        default: 0
    },
    notifications: [notificationsSchema]
})

export default mongoose.model<IMember>('member', memberSchema)