// 'use client'
// import { useState, useEffect } from 'react';

// const AttemptQuizPage = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [selectedQuiz, setSelectedQuiz] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [showResult, setShowResult] = useState(false);
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await fetch(`/api/quiz`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch quizzes');
//         }
//         const data = await response.json();
//         setQuizzes(data);
//       } catch (error) {
//         console.error('Error fetching quizzes:', error);
//         // Handle error state or feedback to user
//       }
//     };

//     fetchQuizzes();
//   }, []);

//   const handleSelectQuiz = async (quizId) => {
//     setSelectedQuiz(quizId);
//     try {
//       const response = await fetch(`/api/quiz=${quizId}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch questions');
//       }
//       const data = await response.json();
//       setQuestions(data);
//     } catch (error) {
//       console.error('Error fetching questions:', error);
//       // Handle error state or feedback to user
//     }
//   };
  

//   const handleAnswerChange = (questionId, answer) => {
//     setAnswers({ ...answers, [questionId]: answer });
//   };

//   const handleSubmitQuiz = async () => {
//     try {
//       let correctAnswersCount = 0;
//       questions.forEach((question) => {
//         if (question.type === 'MCQs' && question.correctOption === parseInt(answers[question._id])) {
//           correctAnswersCount++;
//         } else if (question.type === 'True/False Questions' && question.correctAnswer === answers[question._id]) {
//           correctAnswersCount++;
//         } else if (question.type === 'Fill in the Blanks' && question.correctAnswer.toLowerCase() === answers[question._id]?.toLowerCase()) {
//           correctAnswersCount++;
//         }
//       });

//       const percentageScore = (correctAnswersCount / questions.length) * 100;
//       setScore(percentageScore);
//       setShowResult(true);

//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//     }
//   };

//   if (showResult) {
//     return (
//       <div>
//         <h1 className="text-2xl font-bold mb-4">Quiz Result</h1>
//         <p>Your score: {score.toFixed(2)}%</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Attempt Quiz</h1>
//       <select
//         value={selectedQuiz}
//         onChange={(e) => handleSelectQuiz(e.target.value)}
//         className="block w-full px-4 py-2 mb-4 border rounded"
//       >
//         <option value="" disabled>Select Quiz</option>
//         {quizzes.map((quiz) => (
//           <option key={quiz._id} value={quiz._id}>
//             {quiz.name}
//           </option>
//         ))}
//       </select>
//       {questions.map((question) => (
//         <div key={question._id} className="mb-4">
//           <p>{question.questionText}</p>
//           {question.type === 'MCQs' &&
//             question.options.map((option, index) => (
//               <div key={index}>
//                 <input
//                   type="radio"
//                   id={`${question._id}-${index}`}
//                   name={question._id}
//                   value={index}
//                   onChange={(e) => handleAnswerChange(question._id, e.target.value)}
//                 />
//                 <label htmlFor={`${question._id}-${index}`}>{option}</label>
//               </div>
//             ))}
//           {question.type === 'True/False Questions' && (
//             <>
//               <input
//                 type="radio"
//                 id={`${question._id}-true`}
//                 name={question._id}
//                 value="true"
//                 onChange={(e) => handleAnswerChange(question._id, e.target.value)}
//               />
//               <label htmlFor={`${question._id}-true`}>True</label>
//               <input
//                 type="radio"
//                 id={`${question._id}-false`}
//                 name={question._id}
//                 value="false"
//                 onChange={(e) => handleAnswerChange(question._id, e.target.value)}
//               />
//               <label htmlFor={`${question._id}-false`}>False</label>
//             </>
//           )}
//           {question.type === 'Fill in the Blanks' && (
//             <input
//               type="text"
//               onChange={(e) => handleAnswerChange(question._id, e.target.value)}
//               className="block w-full px-4 py-2 mb-4 border rounded"
//             />
//           )}
//         </div>
//       ))}
//       {questions.length > 0 && (
//         <button onClick={handleSubmitQuiz} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
//           Submit Quiz
//         </button>
//       )}
//     </div>
//   );
// };

// export default AttemptQuizPage;
