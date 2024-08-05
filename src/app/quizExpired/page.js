// 'use client';
// // app/quiz/page.js


// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';

// const QuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [result, setResult] = useState(null);
//   const searchParams = useSearchParams();
//   const quizId = searchParams.get('id');

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       if (!quizId) return;
//       try {
//         const response = await fetch(`/api/quiz/${quizId}`);
//         if (!response.ok) throw new Error('Network response was not ok');
//         const data = await response.json();
//         setQuestions(data || []);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       }
//     };

//     fetchQuestions();
//   }, [quizId]);

//   const handleChange = (questionId, value) => {
//     setAnswers(prev => ({ ...prev, [questionId]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       let correctAnswers = 0;
//       questions.forEach((question) => {
//         if (
//           (question.type === 'MCQs' && question.correctOption == answers[question._id]) ||
//           (question.type === 'True/False Questions' && question.correctOption == (answers[question._id] === 'true')) ||
//           (question.type === 'Fill in the Blanks' && question.correctAnswer === answers[question._id])
//         ) {
//           correctAnswers++;
//         }
//       });

//       const percentage = (correctAnswers / questions.length) * 100;
//       let grade;
//       if (percentage >= 90) grade = 'A';
//       else if (percentage >= 80) grade = 'B';
//       else if (percentage >= 70) grade = 'C';
//       else if (percentage >= 60) grade = 'D';
//       else grade = 'F';

//       setResult({ percentage, grade });

      
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Attempt Quiz</h1>
//       {questions.length === 0 ? (
//         <p>No questions available.</p>
//       ) : (
//         questions.map((question) => (
//           <div key={question._id} className="mb-4">
//             <p>{question?.questionText || 'No question text'}</p>
//             {question?.type === 'MCQs' && question?.options?.map((option, index) => (
//               <div key={index}>
//                 <input
//                   type="radio"
//                   name={question._id}
//                   value={index}
//                   onChange={(e) => handleChange(question._id, e.target.value)}
//                   className="mr-2"
//                 />
//                 <label>{option}</label>
//               </div>
//             ))}
//             {question?.type === 'True/False Questions' && (
//               <div>
//                 <div>
//                   <input
//                     type="radio"
//                     name={question._id}
//                     value="true"
//                     onChange={(e) => handleChange(question._id, e.target.value)}
//                     className="mr-2"
//                   />
//                   <label>True</label>
//                 </div>
//                 <div>
//                   <input
//                     type="radio"
//                     name={question._id}
//                     value="false"
//                     onChange={(e) => handleChange(question._id, e.target.value)}
//                     className="mr-2"
//                   />
//                   <label>False</label>
//                 </div>
//               </div>
//             )}
//             {question?.type === 'Fill in the Blanks' && (
//               <input
//                 type="text"
//                 name={question._id}
//                 onChange={(e) => handleChange(question._id, e.target.value)}
//                 className="block w-full px-4 py-2 mb-4 border rounded"
//               />
//             )}
//           </div>
//         ))
//       )}

//         <button
//         onClick={handleSubmit}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//       >
//         Submit Quiz
//       </button>
//       {result && (
//         <div className="mt-4">
//           <p>Percentage: {result.percentage}%</p>
//           <p>Grade: {result.grade}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizPage;
