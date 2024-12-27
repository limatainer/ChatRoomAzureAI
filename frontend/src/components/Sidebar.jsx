import PropTypes from 'prop-types';
import { X } from 'react-feather';

const Sidebar = ({
  suggestions,
  onSuggestionClick,
  isDarkMode,
  isOpen,
  onClose,
}) => {
  if (!suggestions) {
    console.error('Suggestions prop is undefined');
    return null; // Prevent rendering if suggestions are not available
  }

  return (
    <>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-200"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:static ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } top-0 left-0 h-full lg:h-auto w-3/4 sm:w-64 lg:w-1/4 p-4 sm:p-6 z-50 ${
          isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
        } transition-all duration-200 ease-in-out lg:transition-none shadow-lg lg:shadow-none overflow-y-auto`}
      >
        <div className="flex justify-between items-center lg:hidden mb-6">
          <h2 className="text-xl font-bold">Topics</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Topics Suggestions
          </h1>
        </div>
        <nav>
          <ul className="space-y-2">
            {suggestions.map((topic, index) => (
              <li key={index}>
                <button
                  className={`w-full text-left p-3 rounded-lg ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-accent'
                  } transition-all duration-200`}
                  onClick={() => {
                    onSuggestionClick(topic);
                    onClose();
                  }}
                >
                  {topic}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSuggestionClick: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
