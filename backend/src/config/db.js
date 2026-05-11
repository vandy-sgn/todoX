import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION);

        console.log("Hi Vandy!!!! Connected to Mongo Database");
    } catch (error) {

        console.error("Failed to connect Mongo Database", error);
        process.exit(1);
    }

}