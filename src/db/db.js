import mongoose from 'mongoose';
import Question from '@/app/models/Question';
import Quiz from '@/app/models/Quiz';
import User from '@/app/models/User';


async function connectToDatabase() {
    if (mongoose.connection.readyState !== 1) {  // readyState 1 means connected
        console.log("MONGOOSE: ", mongoose.connection.readyState)
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("MONGODB CONNECTED!");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    } if (mongoose.connection.readyState == 1) {
        console.log("Using existing MongoDB connection.");
    }
    
    else {
        console.log("Error in Mongodb Connection");
    }
}

export default connectToDatabase;
