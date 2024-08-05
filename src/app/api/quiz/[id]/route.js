// /api/quiz/[id]/route.js

import { NextResponse } from 'next/server';
import Quiz from '../../../models/Quiz';
import dotenv from 'dotenv';
import connectToDatabase from '../../../../db/db';

dotenv.config();

export async function GET(request) {
  try {
    await connectToDatabase();

    // Extract the ID from the request URL
    const url = new URL(request.url);
    const id = url.pathname.split('/')[3]; // Assuming URL is /api/quiz/[id]

    if (!id) {
      return NextResponse.json({ error: 'Quiz ID is required' }, { status: 400 });
    }

    const quiz = await Quiz.findById(id).populate('questions').populate('assignedBy');
    console.log("QUIZ FROM QUIZ/[ID]/ROUTE", quiz)
    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }
    
    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz from quiz/[id]/route:', error);
    return NextResponse.json({ error: 'Failed to fetch quiz  from quiz/[id]/route' }, { status: 500 });
  }
}
