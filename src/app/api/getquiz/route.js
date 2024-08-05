import { NextResponse } from 'next/server';
import Quiz from '../../models/Quiz';
import dotenv from 'dotenv';
import connectToDatabase from '../../../db/db'
dotenv.config();



  export async function POST(req, res){
      
    try {
      await connectToDatabase();
      const  {userID}  = await req.json();
      
      if (!userID) {
        console.log("USER ID NOT FOUND!");
        return res.status(400).json({ message: 'User ID is required' });
      }

      console.log("userID", userID)
      
      const quizzes = await Quiz.find({ createdBy: userID }).populate('questions');
      console.log("quizzes from QUIZ", quizzes)
      return NextResponse.json(quizzes);
    }
     catch (error) {
       return NextResponse.json({ error: 'Failed to fetch quizzes for Specific User' }, { status: 500 });
    }
  
};
  

  