import React, { useState } from 'react';

const InputForm = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows="3"
        className="p-2 border rounded w-3/4"
        placeholder="Ask the AI something..."
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Ask AI
      </button>
    </form>
  );
};

export default InputForm;
