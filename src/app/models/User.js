// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';  // Ensure this is imported

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  notifications: [{
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'Pending' }, // 'Pending', 'Viewed', 'Started'
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }]
});

// Customize the JSON output to omit empty arrays
userSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    if (!ret.quizzes.length) {
      delete ret.quizzes;
    }
    return ret;
  }
});

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare hashed password with the input password
userSchema.methods.comparePassword = async function (password) {
  if (!password || !this.password) {
    throw new Error('Invalid password or user record.');
  }
  return bcrypt.compare(password, this.password);
};

// Method to generate a JWT token
userSchema.methods.generateToken = function () {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
  }
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, { expiresIn: '12h' });
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
