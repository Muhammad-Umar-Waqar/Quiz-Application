import connectToDatabase from '../../../db/db';
import User from '../../models/User';
import dotenv from 'dotenv';
dotenv.config();

export async function GET(req) {
    
    try {
        await connectToDatabase();
        const users = await User.find({});
        // console.log("Users: ", users);
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
