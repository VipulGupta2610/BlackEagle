import React from 'react'
import Home from './pages/Home'
import { getCurrentUser } from './features/getCurrentUser.js';

function App() {
  useEffect(() => {
    const getUser = async ()=>{
      await getCurrentUser()
    }
  }, []);
  return (
    <>
      <Home/>
    </>
  )
}

export default App
