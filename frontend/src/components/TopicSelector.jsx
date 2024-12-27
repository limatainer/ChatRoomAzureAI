// src/components/TopicSelector.jsx
import PropTypes from 'prop-types';

const TopicSelector = ({ suggestions, onSuggestionClick, isDarkMode }) => {
  return (
    <div
      className={`
        sticky top-0 
        w-full overflow-x-auto 
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
        p-3 sm:p-4 
        border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
        scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600
      `}
    >
      <div className="flex space-x-3 px-1">
        {suggestions.map((topic, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(topic)}
            className={`
              whitespace-nowrap px-4 py-2 
              rounded-full text-sm
              ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }
              transition-colors duration-200
              flex-shrink-0
            `}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

TopicSelector.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSuggestionClick: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default TopicSelector;
