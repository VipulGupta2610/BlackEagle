import React from 'react';
import { useSelector } from 'react-redux';

const Nav = () => {
    const { selectedConversation } = useSelector(state => state.conversation)
    const { messages } = useSelector(state => state.message)
  return (
    <div>
      
    </div>
  );
}

export default Nav;
