import './index.css';
import useChat from './hooks/useChat';
import Message from './components/Message';
import Sidebar from './components/Sidebar';
import { useRef, useState } from 'react';

const App = () => {
  const { messages, input, setInput, isLoading, sendMessage, messagesEndRef } =
    useChat();
  const inputRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    if (inputRef.current) {
      inputRef.current.focus(); // Keep focus on input after suggestion click
    }
  };

  // Topic suggestions
  const topicSuggestions = [
    'Chocolate Cake Recipe',
    'Vanilla Sponge Cake Recipe',
    'Red Velvet Cake Recipe',
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Toggle dark mode state
  };

  return (
    <div
      className={`
        flex min-h-screen
        ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}
        transition-colors duration-200
      `}
    >
      <Sidebar
        suggestions={topicSuggestions}
        onSuggestionClick={handleSuggestionClick}
        isDarkMode={isDarkMode}
      />
      <div className="flex-grow flex items-center justify-center p-8">
        <div
          className={`
            w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden
            ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
            transition-colors duration-200
          `}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI Chat Assistant
            </h1>
            <button
              onClick={toggleDarkMode}
              className={`
                p-2 rounded-full
                ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
                hover:opacity-80 transition-opacity duration-200
              `}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>

          <div
            className={`
              h-[500px] md:h-[600px] overflow-y-auto p-6 space-y-4
              ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}
            `}
          >
            {messages.map((message, index) => (
              <Message
                key={index}
                role={message.role}
                content={message.content}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div
                  className={`
                    rounded-2xl p-4
                    ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
                  `}
                >
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className={`
                  flex-1 p-4 rounded-xl border-2
                  ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-primary'
                      : 'bg-white border-gray-200 text-black focus:border-primary'
                  }
                  focus:outline-none transition-colors duration-200
                `}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  px-6 py-4 rounded-xl font-medium
                  bg-primary text-white
                  hover:opacity-90 disabled:opacity-50
                  transition-all duration-200
                `}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
