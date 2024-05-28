import mongoose from "mongoose";
const MONGO_URL = "mongodb+srv://test:1234@cluster0.onb7tvx.mongodb.net/Typescript-Template"
export function connect() {
    try {
        mongoose.connect(MONGO_URL)
            .then(r => console.log("DB - Connected"))
    }
    catch (err) {
        console.log("DB - Error: ", err);
    }
} 
