// app/create-question/page.js

'use client';

import { useState, useEffect } from 'react';

const CreateQuestionPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [type, setType] = useState('');
  const [options, setOptions] = useState(['']);
  const [correctOption, setCorrectOption] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch('/api/quiz');
      const data = await response.json();
      setQuizzes(data);
    };

    fetchQuizzes();
  }, []);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleChangeOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreateQuestion = async () => {
    const response = await fetch('/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quizId: selectedQuiz,
        questionText,
        type,
        options,
        correctOption,
        correctAnswer,
      }),
    });

    const data = await response.json();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Question</h1>
      <select
        value={selectedQuiz}
        onChange={(e) => setSelectedQuiz(e.target.value)}
        className="block w-full px-4 py-2 mb-4 border rounded"
      >
        <option value="" disabled>Select Quiz</option>
        {quizzes.map((quiz) => (
          <option key={quiz._id} value={quiz._id}>
            {quiz.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Question Text"
        className="block w-full px-4 py-2 mb-4 border rounded"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="block w-full px-4 py-2 mb-4 border rounded"
      >
        <option value="" disabled>Select Question Type</option>
        <option value="MCQs">MCQs</option>
        <option value="True/False Questions">True/False Questions</option>
        <option value="Fill in the Blanks">Fill in the Blanks</option>
      </select>
      {type === 'MCQs' &&
        options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleChangeOption(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="block w-full px-4 py-2 mb-4 border rounded"
          />
        ))}
      {type === 'MCQs' && (
        <button onClick={handleAddOption} className="px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-700">
          Add Option
        </button>
      )}
      {type === 'MCQs' && (
        <input
          type="text"
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
          placeholder="Correct Option Index"
          className="block w-full px-4 py-2 mb-4 border rounded"
        />
      )}
      {type === 'Fill in the Blanks' && (
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          placeholder="Correct Answer"
          className="block w-full px-4 py-2 mb-4 border rounded"
        />
      )}
           <button onClick={handleCreateQuestion} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Create Question
      </button>
    </div>
  );
};

export default CreateQuestionPage;
