import React, { useState } from 'react';

const LanguageSelector = ({ onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleChange = (e) => {
    setSelectedLanguage(e.target.value);
    onLanguageChange(e.target.value);
  };

  return (
    <div className="p-4">
      <label className="block text-lg font-semibold mb-2">Select Language:</label>
      <select
        value={selectedLanguage}
        onChange={handleChange}
        className="block w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
        <option value="German">German</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
