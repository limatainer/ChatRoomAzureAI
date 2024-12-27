// src/components/Message.jsx
import PropTypes from 'prop-types';

const Message = ({ role, content }) => {
  return (
    <div
      className={`flex ${
        role === 'user' ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
      <div
        className={`
        max-w-[80%] p-4 rounded-2xl shadow-sm
        ${
          role === 'user'
            ? 'bg-primary text-white rounded-br-none'
            : 'bg-accent rounded-bl-none text-emerald-950'
        }
        transition-all duration-200 hover:shadow-md
      `}
      >
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

Message.propTypes = {
  role: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Message;
