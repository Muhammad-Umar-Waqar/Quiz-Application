// app/components/QuestionDropdown.js

'use client';

import { useState } from 'react';

const questionTypes = [
  'MCQs',
  'True/False Questions',
  'Fill in the Blanks',
  // Add more question types here
];

const QuestionDropdown = ({ onSelect }) => {
  const [selectedType, setSelectedType] = useState('');

  const handleSelect = (type) => {
    setSelectedType(type);
    onSelect(type);
  };

  return (
    <div className="relative inline-block w-full">
      <select
        value={selectedType}
        onChange={(e) => handleSelect(e.target.value)}
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="" disabled>Select question type</option>
        {questionTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};

export default QuestionDropdown;
