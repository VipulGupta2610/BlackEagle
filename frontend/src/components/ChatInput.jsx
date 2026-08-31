import React, { useState } from 'react';
import sendMessage from '../features/sendMessage.js';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/messageSlice.js';
import { SendIcon } from 'lucide-react';

const ChatInput = () => {
  const { selectedConversation } = useSelector(state => state.conversation);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    const payload = { prompt: value.trim(), conversationId: selectedConversation?._id };
    dispatch(addMessage({ role: "user", content: value.trim() }));
    setValue("");
    
    // Call API and dispatch assistant response
    const data = await sendMessage(payload);
    dispatch(addMessage({ role: "assistant", content: data }));
  };

  return (
    <div className="w-full bg-transparent p-4 flex justify-center items-center backdrop-blur-sm relative z-20">
      <form 
        onSubmit={handleSendMessage}
        className="w-full max-w-4xl relative flex items-center bg-gray-800/80 rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/50 transition-all duration-300"
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
          placeholder="Message BlackEagle..."
          className="flex-1 max-h-48 min-h-[56px] py-4 pl-6 pr-14 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none resize-none leading-relaxed"
          rows={1}
          style={{ fieldSizing: 'content' }} // New CSS feature for auto-resizing textareas, or rely on normal min-h
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="absolute right-2 bottom-2 p-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:bg-gray-700 disabled:text-gray-500 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
