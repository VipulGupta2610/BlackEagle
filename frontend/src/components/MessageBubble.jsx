import React from 'react';

const MessageBubble = ({ role, content }) => {
    const isUser = role === "user";

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
            <div 
                className={`max-w-[85%] sm:max-w-[75%] px-5 py-3.5 rounded-3xl relative text-sm sm:text-base leading-relaxed ${
                    isUser 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-tr-sm shadow-md shadow-blue-900/20' 
                    : 'bg-gray-800/90 text-gray-100 rounded-tl-sm border border-gray-700/50 shadow-lg backdrop-blur-md'
                }`}
            >
                {!isUser && (
                    <div className="flex items-center gap-2 mb-1.5 opacity-80">
                        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                            <span className="text-[10px] text-blue-400 font-bold">BE</span>
                        </div>
                        <span className="text-xs font-medium text-gray-400 tracking-wide uppercase">BlackEagle</span>
                    </div>
                )}
                <div className="whitespace-pre-wrap break-words">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default MessageBubble;
