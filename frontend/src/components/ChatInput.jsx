import React, { useState } from 'react';
import sendMessage from '../features/sendMessage.js';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setMessages } from '../redux/messageSlice.js';

const ChatInput = () => {
  const { selectedConversation } = useSelector(state => state.conversation)
      const { messages } = useSelector(state => state.message)
  const [value, setvalue] = useState("");

  const dispatch = useDispatch()

  const handleSendMessage = async () => {

    const payload = { prompt: value.trim(), conversationId: selectedConversation?._id };
    dispatch(addMessage({role:"user" , content:value.trim()}))
    const data = await sendMessage(payload);
  };
  return (
    <div>

    </div>
  );
}

export default ChatInput;
