// middleware.js

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Quiz from './models/Quiz';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the request is for the quiz page
  if (pathname === '/quiz') {
    const quizzes = await Quiz.find({}).populate('questions');
    if (quizzes.length === 0 || quizzes.every(quiz => quiz.questions.length === 0)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/quiz'], // Apply middleware only to the quiz page
};
