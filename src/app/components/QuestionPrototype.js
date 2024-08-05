'use client';
// app/components/QuestionPrototype.js


import { useState } from 'react';
const MCQPrototype = ({ question, setQuestion }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestion(prev => ({ ...prev, [name]: value }));
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...question.options];
        newOptions[index] = value;
        setQuestion(prev => ({ ...prev, options: newOptions }));
    };

    const handleCorrectOptionChange = (index) => {
        setQuestion(prev => ({ ...prev, correctOption: index }));
    };

    return (
        <div>
            <input
                type="text"
                name="questionText"
                value={question?.questionText || ''}
                onChange={handleChange}
                placeholder="Enter question text"
                className="block w-full px-4 py-2 mb-4 border rounded"
            />
            {question?.options?.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                    <input
                        type="radio"
                        name="correctOption"
                        value={index}
                        checked={question.correctOption === index}
                        onChange={() => handleCorrectOptionChange(index)}
                        className="mr-2"
                    />
                    <input
                        type="text"
                        name={`option${index}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 px-4 py-2 border rounded"
                    />
                </div>
            ))}
        </div>
    );
};

const TrueFalsePrototype = ({ question, setQuestion }) => {
    const handleChange = (e) => {
        setQuestion(prev => ({ ...prev, correctOption: e.target.value === 'true' }));
    };

    return (
        <div>
            <input
                type="text"
                name="questionText"
                value={question?.questionText || ''}
                onChange={(e) => setQuestion(prev => ({ ...prev, questionText: e.target.value }))}
                placeholder="Enter question text"
                className="block w-full px-4 py-2 mb-4 border rounded"
            />
            <div className="flex items-center mb-2">
                <input
                    type="radio"
                    name="correctOption"
                    value="true"
                    checked={question?.correctOption === true}
                    onChange={handleChange}
                    className="mr-2"
                />
                <label>True</label>
            </div>
            <div className="flex items-center mb-2">
                <input
                    type="radio"
                    name="correctOption"
                    value="false"
                    checked={question?.correctOption === false}
                    onChange={handleChange}
                    className="mr-2"
                />
                <label>False</label>
            </div>
        </div>
    );
};

const FillInTheBlanksPrototype = ({ question, setQuestion }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestion(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <input
                type="text"
                name="questionText"
                value={question?.questionText || ''}
                onChange={handleChange}
                placeholder="Enter question text"
                className="block w-full px-4 py-2 mb-4 border rounded"
            />
            <input
                type="text"
                name="correctAnswer"
                value={question?.correctAnswer || ''}
                onChange={handleChange}
                placeholder="Enter correct answer"
                className="block w-full px-4 py-2 border rounded"
            />
        </div>
    );
};

const QuestionPrototype = ({ type, question, setQuestion }) => {
    switch (type) {
        case 'MCQs':
            return <MCQPrototype question={question} setQuestion={setQuestion} />;
        case 'True/False Questions':
            return <TrueFalsePrototype question={question} setQuestion={setQuestion} />;
        case 'Fill in the Blanks':
            return <FillInTheBlanksPrototype question={question} setQuestion={setQuestion} />;
        default:
            return null;
    }
};

export default QuestionPrototype;
