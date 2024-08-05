'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import QuestionDropdown from '../components/QuestionDropdown';
import QuestionPrototype from '../components/QuestionPrototype';

const Dashboard = () => {
  const [quizName, setQuizName] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [question, setQuestion] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [userId, setUserId] = useState(''); // Fetch or set the current user's ID
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [error, setError] = useState('');
  const [myID, setMyID] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [assignedQuiz, setassignedQuizID] =  useState('');



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found');
          return;
        }
    
        const response = await fetch('/api/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          const result = await response.json();
          setError(result.error);
          return;
        }

        
  
        const userData = await response.json();
        console.log(userData._id);
        setMyID(userData._id);
        setassignedQuizID(userData.quizId);
        setUser(userData);


      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to fetch user');
      }
    };
    
    fetchUser();
  }, []);
  

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!myID) {
          console.error('User ID not found');
          return;
        }

        const response = await fetch(`/api/notifications?userId=${myID}`);
        console.log("Response from Notifications", response)
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [myID]);

  // Fetch quizzes
  // useEffect(() => {
  //   const fetchQuizzes = async () => {
  //     try {
  //       const response = await fetch('/api/quiz');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();

  //       console.log("Data from /api/quiz", data);
  //       setQuizzes(data);
  //     } catch (error) {
  //       console.error('Failed to fetch quizzes from api/qioz:', error);
  //       alert('Failed to fetch quizzes. Check the console for details.');
  //     }
  //   };
    
  //   fetchQuizzes();
  // }, []);
  
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('/api/getquiz', {
           method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID: myID }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log("Data from /api/quiz", data);
        setQuizzes(data);
      } catch (error) {
        console.error('Failed to fetch quizzes from api/qioz:', error);
        // alert('Failed to fetch quizzes from api/quiz. Check the console for details.');
      }
    };
    
    fetchQuizzes();
  }, [myID]);


  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        console.log("USERS", data);
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);
  
  // Handle question type selection
  const handleSelect = (type) => {
    setQuestionType(type);
    setQuestion(
      type === 'MCQs' ? { questionText: '', options: ['', '', '', ''], correctOption: null } :
      type === 'True/False Questions' ? { questionText: '', correctOption: null } :
      { questionText: '', correctAnswer: '' }
    );
  };
  
  // Handle quiz creation
  const handleCreateQuiz = async () => {
    const response = await fetch('/api/quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: quizName, userId: myID }),
    });
  
    if (response.ok) {
      const data = await response.json();
      setQuizzes([...quizzes, data.quiz]);
      setQuizName('');
      alert('Quiz created successfully!');
    } else {
      alert('Failed to create quiz.');
    }
  };
  
  // Handle saving questions
  const handleSave = async () => {
    if (!selectedQuiz || !questionType || !question) {
      alert('Please select a quiz and enter question details.');
      return;
    }
  
    const response = await fetch('/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quizId: selectedQuiz, type: questionType, ...question }),
    });
    console.log("QuizId", selectedQuiz, "questionType", question)
    setassignedQuizID(selectedQuiz);
    console.log(selectedQuiz)
    if (response.ok) {
      setQuestion(null); // Clear question input after saving
      alert('Question saved successfully!');
    } else {
      alert('Failed to save question.');
    }
  };
  
  // Handle assigning quiz to user
  const handleAssignQuiz = async () => {
    if (!selectedUser || !selectedQuiz || !myID) {
      console.error('User or quiz not selected');
      return;
    }
    // console.log('User: ', selectedUser, ' quiz', selectedQuiz, 'Assigned By ', myID);
  
    const response = await fetch('/api/assign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: selectedUser, quizId: selectedQuiz, assignedBy: myID }),
    });
    
    if (response.ok) {
      const result = await response.json();  
      console.log('Quiz assigned successfully:', result);
    } else {
      const error = await response.json();
      console.error('Error assigning quiz:', error);
    }
  };
  
  
  

  const handleNotificationClick = async (notificationId, quizId) => {
    
    // Mark the notification as read
    await fetch(`/api/notifications/${notificationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: notificationId, status: 'read' }),
    });

   console.log("Notifiaction Quiz ID:", quizId._id);
   console.log("Notifiaction Quiz ID:", assignedQuiz);
    // Redirect to the quiz page with the selected quizId
    router.push(`/attempt-quiz/${quizId._id}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user && (
        <div>
          <p>Welcome, {user.name}!</p>
          {/* Add more dashboard functionality here */}
        </div>
      )}
      <div className=''>
        <h1 className="text-2xl font-bold mb-4">Create Your Quiz</h1>
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
  
        <h1 className="text-2xl font-bold mb-4 mt-8">Add Questions to Your Quiz</h1>
        <select
          value={selectedQuiz}
          onChange={(e) => setSelectedQuiz(e.target.value)}
          className="block w-full px-4 py-2 mb-4 border rounded"
        >
          <option value="" disabled>Select Quiz</option>

          {
          quizzes.map((quiz) => (
            <option key={quiz._id} value={quiz._id}>{quiz.name}</option>
          ))}

        </select>
        <QuestionDropdown type={questionType} onSelect={handleSelect} />
        <QuestionPrototype
          type={questionType}
          question={question}
          setQuestion={setQuestion}
        />
        <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
          Save Question
        </button>
  
        <h1 className="text-2xl font-bold mb-4 mt-8">Assign Quiz</h1>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="block w-full px-4 py-2 mb-4 border rounded"
        >
          <option value="" disabled>Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>
        <button onClick={handleAssignQuiz} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Assign Quiz
        </button>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4 mt-8">Notifications</h1>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification._id} className="mb-4 p-4 border rounded">
              <p> {notification.status}</p>
              
              <button
                onClick={() => handleNotificationClick(notification._id, notification.quizId)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Start Quiz
              </button>
            </div>
          ))
        ) : (
          <p>No notifications</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;















































































// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import QuestionDropdown from '../components/QuestionDropdown';
// import QuestionPrototype from '../components/QuestionPrototype';

// const Dashboard = () => {
//   const [quizName, setQuizName] = useState('');
//   const [quizzes, setQuizzes] = useState([]);
//   const [selectedQuiz, setSelectedQuiz] = useState('');
//   const [questionType, setQuestionType] = useState('');
//   const [question, setQuestion] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState('');
//   const [userId, setUserId] = useState(''); // Fetch or set the current user's ID
//   const [user, setUser] = useState(null);
//   const router = useRouter();
//   const [error, setError] = useState('');
//   const [myID, setMyID] = useState('');
//   const [notifications, setNotifications] = useState([]);
//   const [assignedQuiz, setassignedQuizID] =  useState('');

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('No token found');
//           return;
//         }
    
//         const response = await fetch('/api/me', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         const text = await response.text(); // Read the response as text
//         console.log('Response Text:', text); // Log the response text to debug
//         const myId = JSON.parse(text);
//         console.log(myId._id);
//         setMyID(myId._id);
//         setassignedQuizID(myId.quizId);

//         if (!response.ok) {
//           const result = JSON.parse(text);
//           setError(result.error);
//           return;
//         }
    
//         const userData = JSON.parse(text);
//         setUser(userData);
//       } catch (err) {
//         console.error('Error fetching user:', err);
//         setError('Failed to fetch user');
//       }
//     };
    
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         if (!myID) {
//           console.error('User ID not found');
//           return;
//         }

//         const response = await fetch(`/api/notifications?userId=${myID}`);
//         console.log("Response from Notifications", response)
//         if (!response.ok) {
//           throw new Error('Failed to fetch notifications');
//         }

//         const data = await response.json();
//         setNotifications(data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };

//     fetchNotifications();
//   }, [myID]);

//   // Fetch quizzes
//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await fetch('/api/quiz');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();

//         console.log("Data from /api/quiz", data);
//         setQuizzes(data);
//       } catch (error) {
//         console.error('Failed to fetch quizzes:', error);
//         alert('Failed to fetch quizzes. Check the console for details.');
//       }
//     };
    
//     fetchQuizzes();
//   }, []);
  
//   // Fetch users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       const response = await fetch('/api/users');
//       if (response.ok) {
//         const data = await response.json();
//         console.log("USERS", data);
//         setUsers(data);
//       } else {
//         console.error('Failed to fetch users');
//       }
//     };
//     fetchUsers();
//   }, []);
  
//   // Handle question type selection
//   const handleSelect = (type) => {
//     setQuestionType(type);
//     setQuestion(
//       type === 'MCQs' ? { questionText: '', options: ['', '', '', ''], correctOption: null } :
//       type === 'True/False Questions' ? { questionText: '', correctOption: null } :
//       { questionText: '', correctAnswer: '' }
//     );
//   };
  
//   // Handle quiz creation
//   const handleCreateQuiz = async () => {
//     const response = await fetch('/api/quiz', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name: quizName, userId: myID }),
//     });
  
//     if (response.ok) {
//       const data = await response.json();
//       setQuizzes([...quizzes, data.quiz]);
//       setQuizName('');
//       alert('Quiz created successfully!');
//     } else {
//       alert('Failed to create quiz.');
//     }
//   };
  
//   // Handle saving questions
//   const handleSave = async () => {
//     if (!selectedQuiz || !questionType || !question) {
//       alert('Please select a quiz and enter question details.');
//       return;
//     }
  
//     const response = await fetch('/api/questions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ quizId: selectedQuiz, type: questionType, ...question }),
//     });
//     console.log("QuizId", selectedQuiz, "questionType", question)
//     setassignedQuizID(selectedQuiz);
//     console.log(selectedQuiz)
//     if (response.ok) {
//       setQuestion(null); // Clear question input after saving
//       alert('Question saved successfully!');
//     } else {
//       alert('Failed to save question.');
//     }
//   };
  
//   // Handle assigning quiz to user
//   const handleAssignQuiz = async () => {
//     if (!selectedUser || !selectedQuiz || !myID) {
//       console.error('User or quiz not selected');
//       return;
//     }
//     console.error('User: ', selectedUser,  ' quiz', selectedQuiz,'Assigned By ', myID);
  
//     const response = await fetch('/api/assign', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ userId: selectedUser, quizId: selectedQuiz, assignedBy: myID }),
//     });
    
//     if (response.ok) {
//       const result = await response.json();  
//       console.log('Quiz assigned successfully:', result);
//     } else {
//       const error = await response.json();
//       console.error('Error assigning quiz:', error);
//     }
//   };

//   const handleNotificationClick = async (notificationId, quizId) => {
    
//     // Mark the notification as read
//     await fetch(`/api/notifications/${notificationId}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ id: notificationId, status: 'read' }),
//     });

//    console.log("Notifiaction Quiz ID:", quizId._id);
//    console.log("Notifiaction Quiz ID:", assignedQuiz);
//     // Redirect to the quiz page with the selected quizId
//     router.push(`/attempt-quiz/${quizId._id}`);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//       {user && (
//         <div>
//           <p>Welcome, {user.name}!</p>
//           {/* Add more dashboard functionality here */}
//         </div>
//       )}
//       <div className=''>
//         <h1 className="text-2xl font-bold mb-4">Create Your Quiz</h1>
//         <input
//           type="text"
//           value={quizName}
//           onChange={(e) => setQuizName(e.target.value)}
//           placeholder="Quiz Name"
//           className="block w-full px-4 py-2 mb-4 border rounded"
//         />
//         <button onClick={handleCreateQuiz} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
//           Create Quiz
//         </button>
  
//         <h1 className="text-2xl font-bold mb-4 mt-8">Add Questions to Your Quiz</h1>
//         <select
//           value={selectedQuiz}
//           onChange={(e) => setSelectedQuiz(e.target.value)}
//           className="block w-full px-4 py-2 mb-4 border rounded"
//         >
//           <option value="" disabled>Select Quiz</option>
//           {quizzes.map((quiz) => (
//             <option key={quiz._id} value={quiz._id}>{quiz.name}</option>
//           ))}
//         </select>
//         <QuestionDropdown type={questionType} onSelect={handleSelect} />
//         <QuestionPrototype
//           type={questionType}
//           question={question}
//           setQuestion={setQuestion}
//         />
//         <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
//           Save Question
//         </button>
  
//         <h1 className="text-2xl font-bold mb-4 mt-8">Assign Quiz</h1>
//         <select
//           value={selectedUser}
//           onChange={(e) => setSelectedUser(e.target.value)}
//           className="block w-full px-4 py-2 mb-4 border rounded"
//         >
//           <option value="" disabled>Select User</option>
//           {users.map((user) => (
//             <option key={user._id} value={user._id}>{user.name}</option>
//           ))}
//         </select>
//         <button onClick={handleAssignQuiz} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
//           Assign Quiz
//         </button>
//       </div>
//       <div>
//         <h1 className="text-2xl font-bold mb-4 mt-8">Notifications</h1>
//         {notifications.length > 0 ? (
//           notifications.map((notification) => (
//             <div key={notification._id} className="mb-4 p-4 border rounded">
//               <p> {notification.status}</p>
              
//               <button
//                 onClick={() => handleNotificationClick(notification._id, notification.quizId)}
//                 className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//               >
//                 Start Quiz
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No notifications</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
