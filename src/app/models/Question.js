// models/Question.js

import mongoose from 'mongoose';

// Define the schema
const questionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  questionText: { type: String, required: true },
  options: [String],
  correctOption: Number,
  correctAnswer: String,
});

// Register the model with Mongoose
const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

export default Question;
