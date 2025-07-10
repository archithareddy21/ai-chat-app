import React, { useState } from 'react';
import { getAIResponse } from './services/aiService'; // Import AI service for API calls

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);  // For managing loading state
  const [error, setError] = useState(null); // For handling errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = input.trim();

    // Only proceed if the message is non-empty and not already in history
    if (userMessage && !messages.some(msg => msg.text === userMessage)) {
      setMessages([...messages, { isUser: true, text: userMessage, timestamp: new Date() }]);
      setInput('');
      setLoading(true);  // Start loading when the API is called
      setError(null);  // Clear any previous errors

      try {
        // Call the AI service to get the AI response
        const aiMessage = await getAIResponse(userMessage);
        setMessages((prevMessages) => [
          ...prevMessages,
          { isUser: false, text: aiMessage, timestamp: new Date() },
        ]);
      } catch (err) {
        // Handle errors from the AI service (e.g., rate limit exceeded, API errors)
        setError(err.message || 'An error occurred. Please try again later.');
      } finally {
        setLoading(false);  // Stop loading once the response is received or an error occurs
      }
    }
  };

  const handleClearHistory = () => {
    setMessages([]); // Reset the conversation history
  };

  // Function to format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="space-y-4 p-4 overflow-auto max-h-80 bg-white rounded-lg shadow-lg">
        {messages.map((msg, index) => (
          <div key={index} className={`text-sm p-2 rounded ${msg.isUser ? 'bg-blue-200' : 'bg-gray-200'}`}>
            <strong>{msg.isUser ? 'You: ' : 'AI: '}</strong>
            <p>{msg.text}</p>
            <small className="text-gray-500">{formatTimestamp(msg.timestamp)}</small> {/* Timestamp */}
          </div>
        ))}
      </div>

      {/* Error message */}
      {error && (
        <div className="text-red-500 mt-2">
          <strong>Error: </strong>{error}
        </div>
      )}

      {/* Clear History Button */}
      <button onClick={handleClearHistory} className="px-4 py-2 bg-red-500 text-white rounded mt-2">
        Clear History
      </button>

      {/* Input field for submitting a new message */}
      <form onSubmit={handleSubmit} className="flex space-x-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Regular typing without debounce
          placeholder="Ask the AI something..."
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Ask
        </button>
      </form>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full" role="status">
            <span className="visually-hidden">...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;


