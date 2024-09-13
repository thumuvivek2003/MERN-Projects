import React, { useEffect, useRef, useState } from 'react';

const ChapterDisplay = ({ fontClass,book, chapter, verses, selectedVerse,theme}) => {
  const verseRefs = useRef([]); // Array of refs to each verse
  const [highlightedVerse, setHighlightedVerse] = useState(null);

  useEffect(() => {
    if (selectedVerse && verseRefs.current[selectedVerse - 1]) {
      verseRefs.current[selectedVerse - 1].scrollIntoView({ behavior: 'smooth' });
      setHighlightedVerse(selectedVerse);


      const timer = setTimeout(() => {
        setHighlightedVerse(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [selectedVerse]);

  return (
    <div className = {`p-4 ${fontClass} ${theme.bgColor}`}>
      <h2 className = {`text-xl font-bold mb-4 ${theme.headingColor}`}>
        {book} - Chapter {chapter}
        {/* <p>{JSON.stringify(theme)}</p> */}
      </h2>
      <div className="space-y-4">
        {verses.map((verseObj, index) => (
          <div
            key={verseObj.verse}
            ref={(el) => (verseRefs.current[index] = el)}
            className={`p-4 rounded-lg shadow transition ease-in-out delay-150 ${theme.textColor} ${
              verseObj.verse === highlightedVerse ? 'bg-yellow-200' : `${theme.cardColor}`
            }`}
            
            style={{ transition: 'background-color 0.3s ease-in-out'}}
          >
            <span className="font-semibold">
              {verseObj.verse}: &nbsp;
            </span>
            {verseObj.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterDisplay;
