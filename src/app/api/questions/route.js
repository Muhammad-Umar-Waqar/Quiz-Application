import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Question from '../../models/Question';
import Quiz from '../../models/Quiz';
import dotenv from 'dotenv';
import connectToDatabase from '../../../db/db'


dotenv.config();

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const { quizId, questionText, type, options, correctOption, correctAnswer } = data;

    const newQuestion = new Question({ questionText, type, options, correctOption, correctAnswer, quiz: quizId });
    await newQuestion.save();

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }
    quiz.questions.push(newQuestion._id);
    await quiz.save();

    return NextResponse.json({ message: 'Question added to quiz successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add question' }, { status: 500 });
  }
}

export async function GET(request) {
  await connectToDatabase();
  try {
    const { searchParams } = new URL(request.url);
    const quizId = searchParams.get('quiz');

    if (!quizId) {
      return NextResponse.json({ error: 'Quiz ID is required' }, { status: 400 });
    }

    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json(quiz.questions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}