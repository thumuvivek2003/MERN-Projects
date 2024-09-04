import React, { useState } from 'react';

const VerseNav = ({ verses, onVerseChange }) => {
  const [selectedVerse, setSelectedVerse] = useState(verses[0]);

  const handleVerseSelect = (verse) => {
    setSelectedVerse(verse);
    onVerseChange(verse);
  };

  return (
    <div className="p-4">
      {/* <label className="block text-lg font-semibold mb-2">Select Verse:</label> */}
      <div className="flex flex-wrap">
        {verses.map((verse, index) => (
          <button
            key={index}
            onClick={() => handleVerseSelect(verse)}
            className={`px-4 py-2 m-1 text-sm font-medium rounded-lg ${
              verse === selectedVerse ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'
            } hover:bg-red-500 hover:text-white focus:outline-none`}
          >
            {verse}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VerseNav;
