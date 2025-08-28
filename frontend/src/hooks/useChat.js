import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('gemini');
  const [availableProviders, setAvailableProviders] = useState({});

  // Updated topic suggestions - you can customize these
  const topicSuggestions = [
    'Write a sonnet about programming',
    'Explain quantum computing',
    'Tell me about AI development',
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

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        const response = await axios.get(`${baseURL}/api/providers`);
        if (response.data.success) {
          setAvailableProviders(response.data.providers);
          if (response.data.defaultProvider) {
            setSelectedProvider(response.data.defaultProvider);
          }
        }
      } catch (error) {
        console.error('Failed to fetch providers:', error);
      }
    };
    
    fetchProviders();
  }, []);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setInput('');
    setIsLoading(true);

    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await axios.post(
        `${baseURL}/api/chat`,
        {
          message,
          provider: selectedProvider,
        },
        {
          timeout: import.meta.env.VITE_API_TIMEOUT || 30000,
        }
      );

      if (response.data.success) {
        setMessages((prev) => [
          ...prev,
          { 
            role: 'assistant', 
            content: response.data.message,
            provider: response.data.provider,
            model: response.data.model
          },
        ]);
      } else {
        throw new Error(response.data.message || 'Chat request failed');
      }
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = `Error: ${error.response.data.message}`;
      } else if (error.message.includes('Network Error')) {
        const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        errorMessage = `Cannot connect to server. Make sure the server is running on ${baseURL}`;
      }
      
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: errorMessage,
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
    topicSuggestions,
    handleSuggestionClick,
    isDarkMode,
    toggleDarkMode,
    selectedProvider,
    setSelectedProvider,
    availableProviders,
  };
};

export default useChat;
