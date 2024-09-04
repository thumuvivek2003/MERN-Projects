import React, { useState,useEffect } from 'react';

const ChapterNav = ({ chapter,chapters, onChapterChange }) => {
  const [selectedChapter, setSelectedChapter] = useState(chapter);


  useEffect(() => {
    setSelectedChapter(chapter);
  }, [chapter]);


  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    onChapterChange(chapter);
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap">
        {chapters.map((chapter, index) => (
          <button
            key={index}
            onClick={() => handleChapterSelect(chapter)}
            className={`px-4 py-2 m-1 text-sm font-medium rounded-lg ${
              chapter === selectedChapter ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'
            } hover:bg-green-500 hover:text-white focus:outline-none`}
          >
            {chapter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChapterNav;
