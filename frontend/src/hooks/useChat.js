// src/hooks/useChat.js
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Add dark mode state

  const topicSuggestions = [
    'Chocolate Cake Recipe',
    'Vanilla Sponge Cake Recipe',
    'Red Velvet Cake Recipe',
  ];

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/chat', {
        message,
      });
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response.data.message },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
    messagesEndRef,
    topicSuggestions, // Ensure this is returned
    handleSuggestionClick, // Ensure this is returned
    isDarkMode, // Ensure this is returned
    toggleDarkMode, // Return dark mode toggle function
  };
};

export default useChat;
