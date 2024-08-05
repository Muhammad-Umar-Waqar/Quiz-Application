// app/create-quiz/page.js

'use client';

import { useState } from 'react';

const CreateQuizPage = () => {
  const [quizName, setQuizName] = useState('');
  const [quizzes, setQuizzes] = useState([]);

  const fetchQuizzes = async () => {
    const response = await fetch('/api/quiz');
    const data = await response.json();
    setQuizzes(data);
  };

  const handleCreateQuiz = async () => {
    const response = await fetch('/api/quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: quizName }),
    });

    const data = await response.json();
    fetchQuizzes();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
      <input
        type="text"
        value={quizName}
        onChange={(e) => setQuizName(e.target.value)}
        placeholder="Quiz Name"
        className="block w-full px-4 py-2 mb-4 border rounded"
      />
      <button onClick={handleCreateQuiz} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Create Quiz
      </button>
      <h2 className="text-xl font-bold mt-8">Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>{quiz.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CreateQuizPage;
