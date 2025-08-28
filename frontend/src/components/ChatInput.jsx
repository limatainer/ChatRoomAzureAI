const ChatInput = ({ input, setInput, sendMessage, isLoading, isDarkMode }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
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
  );
};

export default ChatInput;