import Message from './Message';

const ChatArea = ({ messages, isLoading, isDarkMode, messagesEndRef }) => {
  return (
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
    </div>
  );
};

export default ChatArea;