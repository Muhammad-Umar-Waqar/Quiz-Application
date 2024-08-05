// app/api/notifications/[id]/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '../../../models/User';
import connectToDatabase from '../../../../db/db';

export async function PATCH(request) {
  try {
    await connectToDatabase();
    const { id , status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const user = await User.findOne({ 'notifications._id': id });
    if (!user) {
      console.log("User not Found in notifications")
      return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
    }

    const notification = user.notifications.id(id);
    if (notification) {
      notification.status = status;
      await user.save();
      return NextResponse.json({ message: 'Notification status updated successfully' });
    } else {
      return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
    }

  } catch (error) {
    console.error('Error updating notification status:', error);
    return NextResponse.json({ error: 'Failed to update notification status' }, { status: 500 });
  } finally {
    await mongoose.disconnect();
  }
}
