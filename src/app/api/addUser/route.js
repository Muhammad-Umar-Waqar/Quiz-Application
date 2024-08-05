// app/api/signup/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '../../models/User';
import connectToDatabase from '../../../db/db'
import dotenv from 'dotenv';

dotenv.config();


export async function POST(request) {
  try {
    await connectToDatabase();
    const { name, email, password } = await request.json();

    // Ensure the password field is provided
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create a new user with a hashed password
    const newUser = new User({ name, email, password });
    await newUser.save();

    return NextResponse.json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  } finally {
    await mongoose.disconnect();
  }
}
