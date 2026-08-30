import React, { useState } from 'react';
import sendMessage from '../features/sendMessage.js';
import { useSelector } from 'react-redux';

const ChatInput = () => {
  const { selectedConversation } = useSelector(state => state.conversation)
  const [value, setvalue] = useState("");
  const handleSendMessage = async () => {

    const payload = { prompt: value.trim(), conversationId: selectedConversation?._id };
    const data = await sendMessage(payload);
  };
  return (
    <div>

    </div>
  );
}

export default ChatInput;
