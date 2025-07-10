import React, { useState } from 'react';
import getAIResponse from '../services/aiService'; // Import the AI service function

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (userMessage) {
      setMessages([...messages, { isUser: true, text: userMessage }]);
      setInput('');

      // Get AI response
      const aiMessage = await getAIResponse(userMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { isUser: false, text: aiMessage },
      ]);
    }
  };

  return (
    <div>
      <div className="space-y-4 p-4 overflow-auto max-h-80">
        {messages.map((msg, index) => (
          <div key={index} className={`text-sm p-2 rounded ${msg.isUser ? 'bg-blue-200' : 'bg-gray-200'}`}>
            <strong>{msg.isUser ? 'You: ' : 'AI: '}</strong>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the AI something..."
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Ask
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
