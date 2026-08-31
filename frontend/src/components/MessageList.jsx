import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.jpg';
import MessageBubble from './MessageBubble';

const MessageList = () => {
  const { selectedConversation } = useSelector(state => state.conversation);
  const { messages } = useSelector(state => state.message);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto relative p-6 flex flex-col scroll-smooth">
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none flex justify-center items-center"
        style={{ backgroundImage: `url(${logo})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '50%' }}
      >
      </div>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto h-full flex flex-col">
        {messages?.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 opacity-60">
            <div className="w-24 h-24 mb-4 rounded-full bg-gray-800/50 flex items-center justify-center shadow-inner">
               <span className="text-4xl">🦅</span>
            </div>
            <p className="text-xl font-medium">How can I help you today?</p>
          </div>
        ) : (
          <div className="flex flex-col pb-8">
            {messages?.map((msg, index) => (
              <MessageBubble key={index} role={msg.role} content={msg.content} />
            ))}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageList;
