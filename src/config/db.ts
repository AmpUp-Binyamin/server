import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL as string
export function connect() {
    try {        
        mongoose.connect('mongodb+srv://binyamin:b2024b2024@cluster0.rtg2yla.mongodb.net/AmpUp')
            .then(r => console.log("DB - Connected"))
    }
    catch (err) {
        console.log("DB - Error: ", err);
    }
} 
