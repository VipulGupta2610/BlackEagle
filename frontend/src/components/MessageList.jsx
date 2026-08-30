import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.jpg';

const MessageList = () => {
  const { selectedConversation } = useSelector(state => state.conversation)
  const { messages } = useSelector(state => state.message)
  return (
    <div className="flex-1 overflow-y-auto relative p-4 flex flex-col gap-2">
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none flex justify-center items-center"
        style={{ backgroundImage: `url(${logo})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }}
      >
      </div>
      <div className="relative z-10 w-full h-full">
        {/* Messages will go here */}
      </div>
    </div>
  );
}

export default MessageList;
