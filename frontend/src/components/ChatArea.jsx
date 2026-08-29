import React from 'react';
import Nav from './Nav.jsx';
import MessageList from './MessageList.jsx';
import ChatInput from './ChatInput.jsx';

const ChatArea = () => {
  return (
    <div className='flex-1 flex flex-col'>
      <Nav/>
      <MessageList/>
      <ChatInput/>
    </div>
  );
}

export default ChatArea;
