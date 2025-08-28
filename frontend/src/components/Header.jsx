import { Menu } from 'react-feather';

const Header = ({ isDarkMode, toggleDarkMode, onMenuClick }) => {
  return (
    <div
      className={`w-full flex justify-between items-center px-4 py-3 sm:px-6 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } border-b border-gray-200`}
    >
      <button
        onClick={onMenuClick}
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
  );
};

export default Header;