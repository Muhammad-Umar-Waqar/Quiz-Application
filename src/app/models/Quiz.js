// models/Quiz.js
import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Add assignedBy field
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Add assignedBy field
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Add assignedBy field
  // other fields as necessary
});

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
export default Quiz;
