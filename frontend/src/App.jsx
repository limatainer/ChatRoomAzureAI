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
      className={`flex min-h-screen ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <Sidebar
        suggestions={topicSuggestions}
        onSuggestionClick={handleSuggestionClick}
        isDarkMode={isDarkMode}
      />

      <div className="flex-grow flex items-center justify-center p-6">
        <div
          className={`w-full max-w-xl rounded-lg shadow-xl overflow-hidden ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
          }`}
        >
          <div className="flex justify-between items-center bg-blue-600 p-4">
            <h1 className="text-white text-2xl font-bold">AI Chat Assistant</h1>
            <button onClick={toggleDarkMode} className="text-white">
              {isDarkMode ? '☼' : '☾'} {/* Sun and Moon icons */}
            </button>
          </div>

          <div
            className={`h-[500px] md:h-[600px] overflow-y-auto p-4 space-y-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-800'
            }`}
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
                  className={`rounded-lg p-3 ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-200'
                      : 'bg-gray-300 text-gray-800'
                  }`}
                >
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <input
                type="text"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className={`flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-gray-700 text-white focus:ring-blue-500'
                    : 'bg-white text-black focus:ring-blue-600'
                }`}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 ${
                  isDarkMode ? 'hover:bg-blue-500' : ''
                }`}
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
