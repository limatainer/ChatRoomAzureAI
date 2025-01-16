// src/App.jsx
import './index.css';
import useChat from './hooks/useChat';
import Message from './components/Message';
import Sidebar from './components/Sidebar';
import TopicSelector from './components/TopicSelector';
import { useState } from 'react';
import { Menu } from 'react-feather';

const App = () => {
  const {
    isDarkMode,
    messages,
    isLoading,
    input,
    sendMessage,
    setInput,
    messagesEndRef,
    topicSuggestions,
    handleSuggestionClick,
    toggleDarkMode,
  } = useChat();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      } transition-colors duration-200`}
    >
      <Sidebar
        suggestions={topicSuggestions}
        onSuggestionClick={handleSuggestionClick}
        isDarkMode={isDarkMode}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-grow flex flex-col w-full lg:w-3/4">
        <div
          className={`w-full flex justify-between items-center px-4 py-3 sm:px-6 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } border-b border-gray-200`}
        >
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu size={24} />
          </button>

          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI Chat Assistant
          </h1>

          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            } hover:opacity-80 transition-opacity duration-200`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Topics selector for mobile */}
        <div className="lg:hidden">
          <TopicSelector
            suggestions={topicSuggestions}
            onSuggestionClick={handleSuggestionClick}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Chat Area */}
        <div className="flex-grow flex flex-col">
          <div
            className={`flex-grow overflow-y-auto p-4 sm:p-6 space-y-4 ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
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
                  className={`rounded-2xl p-3 sm:p-4 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                >
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className={`flex-grow p-3 sm:p-4 rounded-xl border-2 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-primary'
                    : 'bg-white border-gray-200 text-black focus:border-primary'
                } focus:outline-none transition-colors duration-200`}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 sm:py-4 rounded-xl font-medium bg-primary text-white hover:opacity-90 disabled:opacity-50 transition-all duration-200`}
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
