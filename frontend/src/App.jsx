// src/App.jsx
import './index.css';
import useChat from './hooks/useChat';
import Sidebar from './components/Sidebar';
import TopicSelector from './components/TopicSelector';
import Header from './components/Header';
import ChatArea from './components/ChatArea';
import ChatInput from './components/ChatInput';
import ProviderSelector from './components/ProviderSelector';
import { useState } from 'react';

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
    selectedProvider,
    setSelectedProvider,
    availableProviders,
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
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* Provider Selector */}
        <ProviderSelector
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          availableProviders={availableProviders}
          isDarkMode={isDarkMode}
        />

        {/* Topics selector for mobile */}
        <div className="lg:hidden">
          <TopicSelector
            suggestions={topicSuggestions}
            onSuggestionClick={handleSuggestionClick}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Chat Area */}
        <ChatArea
          messages={messages}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
          messagesEndRef={messagesEndRef}
        />

        {/* Input Form */}
        <ChatInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default App;
