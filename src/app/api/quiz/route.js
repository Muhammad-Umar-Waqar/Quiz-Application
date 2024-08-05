// src/app/api/quiz/route.js

import { NextResponse } from 'next/server';
import Quiz from '../../models/Quiz';
import User from '../../models/User';
import dotenv from 'dotenv';
import connectToDatabase from '../../../db/db';


dotenv.config();
export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();

    // Add the createdBy field to the quiz data
    const newQuiz = new Quiz({ ...data, createdBy: data.userId });
    console.log("Data", data);
    console.log("new Quiz", newQuiz);
    await newQuiz.save();

    // Update the user's quizzes array
    const userId = data.userId; 
    await User.findByIdAndUpdate(
      userId,
      { $push: { quizzes: newQuiz._id } }, 
      { new: true } 
    );

    return NextResponse.json({ message: 'Quiz created successfully', quiz: newQuiz });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create quiz' }, { status: 500 });
  }
}








// export async function GET(request) {
//   try {
//     await connectToDatabase();
    
//     let quizzes;
    
//     if (userId) {
//       quizzes = await Quiz.find({ createdBy: userId }).populate('questions');
//     } 
//     return NextResponse.json(quizzes);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to fetch quizzes  from quiz/route' }, { status: 500 });
//   }
// }
