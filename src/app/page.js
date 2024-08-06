'use client';
// app/page.js
import '../../src/app/globals.css';

import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  function handleSignin() {
    router.push("/signin");
  }

  function handleSignup() {
    router.push("/signup");
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <h1 className='text-5xl text-green-500 text-center mb-8'>QUIZ APP</h1>
      <div className='flex space-x-4'>
        <button 
          type="button" 
          onClick={handleSignin} 
          className='px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300'
        >
          Sign in
        </button>
        <button 
          type="button" 
          onClick={handleSignup} 
          className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'
        >
          Sign up
        </button>
      
      </div>
    </div>
  );
};

export default Home;
