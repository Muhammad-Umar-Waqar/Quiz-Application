// components/Notification.js

'use client';

import { useState, useEffect } from 'react';

const Notification = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch(`/api/notifications?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        console.error('Failed to fetch notifications');
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleStartQuiz = async (quizId, notificationId) => {
    // Mark notification as viewed
    await fetch(`/api/notifications/${notificationId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Started' }),
    });

    // Redirect to quiz or display it
    alert(`Starting Quiz ${quizId}`);
  };

  return (
    <div className='notifications'>
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length === 0 && <p>No new notifications.</p>}
      {notifications.map(notification => (
        <div key={notification._id} className={`notification ${notification.status}`}>
          <p>You have been assigned a quiz by {notification.assignedBy.name}</p>
          {notification.status === 'Pending' && (
            <button
              onClick={() => handleStartQuiz(notification.quizId, notification._id)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Start Quiz
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Notification;
