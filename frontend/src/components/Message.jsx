import PropTypes from 'prop-types';

const Message = ({ role, content }) => {
  // Function to process and format content
  const formatContent = (text) => {
    // Split content by common delimiters
    return text.split('**').map((segment, index) => {
      // Check if segment is a heading
      if (
        segment.toLowerCase().includes('ingredients:') ||
        segment.toLowerCase().includes('instructions:') ||
        segment.toLowerCase().includes('tips:')
      ) {
        return (
          <h3 key={index} className="font-bold text-lg mt-3 mb-2">
            {segment}
          </h3>
        );
      }

      // Process lists (items starting with numbers or asterisks)
      if (/^\d+\.|\*/.test(segment)) {
        const items = segment
          .split(/(?=\d+\.|\*)/)
          .filter((item) => item.trim());
        return (
          <ul key={index} className="list-disc pl-4 space-y-2 my-2">
            {items.map((item, i) => (
              <li key={i}>{item.replace(/^\d+\.|\*/, '').trim()}</li>
            ))}
          </ul>
        );
      }

      // Regular text
      return (
        <p key={index} className="mb-2">
          {segment}
        </p>
      );
    });
  };

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
        <div className="text-sm sm:text-base leading-relaxed break-words">
          {formatContent(content)}
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  role: PropTypes.oneOf(['user', 'assistant']).isRequired,
  content: PropTypes.string.isRequired,
};

export default Message;
