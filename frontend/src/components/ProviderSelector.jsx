const ProviderSelector = ({ 
  selectedProvider, 
  setSelectedProvider, 
  availableProviders, 
  isDarkMode 
}) => {
  const providers = Object.keys(availableProviders);
  
  if (providers.length <= 1) {
    return null; // Don't show selector if only one or no providers
  }

  const getProviderDisplayName = (provider) => {
    switch (provider) {
      case 'azure': return 'Azure OpenAI';
      case 'gemini': return 'Google Gemini';
      default: return provider.charAt(0).toUpperCase() + provider.slice(1);
    }
  };

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <label className={`block text-sm font-medium mb-2 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        AI Provider:
      </label>
      <select
        value={selectedProvider}
        onChange={(e) => setSelectedProvider(e.target.value)}
        className={`w-full p-2 rounded-lg border ${
          isDarkMode
            ? 'bg-gray-700 border-gray-600 text-white focus:border-primary'
            : 'bg-white border-gray-300 text-black focus:border-primary'
        } focus:outline-none transition-colors duration-200`}
      >
        {providers.map((provider) => (
          <option key={provider} value={provider}>
            {getProviderDisplayName(provider)}
          </option>
        ))}
      </select>
      
      {selectedProvider && (
        <div className={`mt-2 text-xs ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Currently using: {getProviderDisplayName(selectedProvider)}
        </div>
      )}
    </div>
  );
};

export default ProviderSelector;