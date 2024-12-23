// src/components/Sidebar.jsx
import PropTypes from 'prop-types';

const Sidebar = ({ suggestions, onSuggestionClick, isDarkMode }) => {
  return (
    <div
      className={`w-1/4 p-4 shadow-lg rounded-lg ${
        isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-800'
      }`}
    >
      <div className="bg-blue-600 mt-8 mb-4 p-2">
        <h1 className="text-white text-2xl font-bold text-center">
          Topics Suggestions
        </h1>
      </div>
      <h2 className="text-xl font-semibold mb-4">
        Select one and start the chat
      </h2>
      <ul className="space-y-3">
        {suggestions.map((topic, index) => (
          <li
            key={index}
            className={`cursor-pointer  hover:underline transition duration-200 ${
              isDarkMode ? 'text-green-300' : 'text-blue-950'
            }`}
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
