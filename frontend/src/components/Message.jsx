// src/components/Message.jsx
import PropTypes from 'prop-types';

const Message = ({ role, content }) => {
  return (
    <div
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          role === 'user'
            ? 'bg-primary text-white rounded-br-none'
            : 'bg-accent text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};

Message.propTypes = {
  role: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Message;
