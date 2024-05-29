import mongoose from 'mongoose'
import IMedia from '../interfaces/IMedia';

const mediaSchema = new mongoose.Schema<IMedia>({
    type: {
        type: String,
        required: true,
        enum: ["image", "video", "audio", "document", "other"]
    },
    fileName: {
        type: String,
        unique: true,
        required: true
    },
    path: {
        unique: true,
        type: String,
        select: false,
    },
})

export default mongoose.model<IMedia>('media', mediaSchema)