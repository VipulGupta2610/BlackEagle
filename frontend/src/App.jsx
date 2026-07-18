import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, googleProvider } from '../utils/firebase.js';
import api from '../utils/axios.js';

const App = () => {

  const handleLogin=async (token)=>{
    try {
      const {data} = await api.post("/auth/login",{token})
    } catch (error) {
      console.log("Error at handleLogin")
      console.log(error)
    }
  }

  const googleLogin = async ()=>{
  const data =  await signInWithPopup(auth,googleProvider)
  const token = await data.user.getIdToken()
  await handleLogin(token)
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
