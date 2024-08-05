import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '../../models/User';
import Quiz from '../../models/Quiz';
import connectToDatabase from '../../../db/db';
import dotenv from 'dotenv';

dotenv.config();

export async function POST(request) {
  try {
    await connectToDatabase();
    const { userId, quizId, assignedBy } = await request.json();
    
    console.log("userID", userId, "quizId", quizId, "assignedBy", assignedBy);
    if (!userId || !quizId || !assignedBy) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
    }
    
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 }); 
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Ensure assignedUsers is initialized
    if (!quiz.assignedUsers) {
      quiz.assignedUsers = [];
    }

    // Update the Quiz's assignedUsers field
    if (!quiz.assignedUsers.includes(userId)) {
      quiz.assignedUsers.push(userId);
      await quiz.save();
    }

    // Ensure notifications is initialized
    if (!user.notifications) {
      user.notifications = [];
    }

    // Create and add the notification
    user.notifications.push({
      quizId: quiz._id,
      assignedBy: assignedBy,
      status: 'Pending'
    });

    await user.save();

    return NextResponse.json({ message: 'Quiz assigned successfully' });
  } catch (error) {
    console.error('Error assigning quiz:', error);
    return NextResponse.json({ error: 'Failed to assign quiz' }, { status: 500 });
  } finally {
    await mongoose.disconnect();
  }
}
