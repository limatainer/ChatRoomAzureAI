// src/components/Sidebar.jsx
import PropTypes from 'prop-types';

const Sidebar = ({ suggestions, onSuggestionClick, isDarkMode }) => {
  return (
    <div
      className={`
      w-1/4 p-6 rounded-r-2xl shadow-lg
      ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}
      transition-colors duration-200
    `}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Topics Suggestions
        </h1>
      </div>
      <h2 className="text-lg font-medium mb-6">Select to start chat</h2>
      <ul className="space-y-4">
        {suggestions.map((topic, index) => (
          <li
            key={index}
            className={`
            cursor-pointer p-3 rounded-lg
            ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-accent'}
            transition-all duration-200
          `}
            onClick={() => onSuggestionClick(topic)}
          >
            {topic}
          </li>
        ))}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSuggestionClick: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};
Sidebar.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSuggestionClick: PropTypes.func.isRequired,
};

export default Sidebar;
