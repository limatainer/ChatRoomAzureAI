// src/components/Message.jsx
import PropTypes from 'prop-types';

const Message = ({ role, content }) => {
  return (
    <div
      className={`
        flex ${role === 'user' ? 'justify-end' : 'justify-start'} 
        mb-4 px-2 sm:px-0
      `}
    >
      <div
        className={`
          max-w-[90%] sm:max-w-[85%] md:max-w-[80%] 
          p-3 sm:p-4 
          rounded-2xl shadow-sm
          ${
            role === 'user'
              ? 'bg-primary text-white rounded-br-none'
              : 'bg-accent rounded-bl-none'
          }
          transition-all duration-200 hover:shadow-md
        `}
      >
        <p className="text-sm sm:text-base leading-relaxed break-words">
          {content}
        </p>
      </div>
    </div>
  );
};

Message.propTypes = {
  role: PropTypes.oneOf(['user', 'assistant']).isRequired,
  content: PropTypes.string.isRequired,
};

export default Message;
