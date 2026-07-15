import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, googleProvider } from '../utils/firebase.js';

const App = () => {

  const googleLogin = async ()=>{
  const data =  await signInWithPopup(auth,googleProvider)
  console.log(data)
  }

  return (
    <div className='w-full h-screen bg-black text-white flex items-center justify-center'>
   <button onClick={googleLogin} className='w-50 h-20 text-black bg-white'>
    Continue with google
   </button>
    </div>
  );
}

export default App;
