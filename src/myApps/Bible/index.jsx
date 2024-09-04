import React, { useState,useEffect } from "react";

import LanguageSelector from "./LanguageSelector";
import BookNav from "./BookNav";
import ChapterNav from "./ChapterNav";
import VerseNav from "./VerseNav";
import ChapterDisplay from "./ChapterDisplay";
import Spinner from './Spinner.jsx';
import booksData from "./booksMeta";
import  Alert from './Alert.jsx'


import version_key_pairs from "./data/version_key_pairs.js";
import font_name_class from "./data/font_name_class.js";

import Model from './Model.jsx'
import CustomSelect from "./CustomSelect.jsx";

import './index.css'


const App = () => {
  const [language, setLanguage] = useState("English");
  const [version,setVersion] = useState('kjv');
  const [fontClass,setFontClass] = useState('font-cairo');
  const [book, setBook] = useState(booksData[0]);
  const [chapter, setChapter] = useState(1);
  const [verse, setVerse] = useState(1);







  const handleBookChange = (bookName) => {
    const selectedBook = booksData.find((b) => b.name === bookName);
    setBook(selectedBook);
    setChapter(1);
    setVerse(1);
  };

  const handleChapterChange = (chapterNumber) => {
    setChapter(chapterNumber);
    setVerse(1); // Reset verse to 1 when the chapter changes
  };

  const handleVerseChange = (verseNumber) => {
    setVerse(verseNumber);
  };


  const [loading, setLoading] = useState(true);
  const [verses, setVerses] = useState({});

  useEffect(() => {
    setLoading(true); 
    console.log(`https://bible-api.com/${book.name}+${chapter}?translation=${version}`)
    fetch(`https://bible-api.com/${book.name}+${chapter}?translation=${version}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data['error'] === 'not found') {
          setVersion('kjv');
          return
        }
        console.log(data);
        setVerses(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching the verses:", error);
        setLoading(false); 
      });
  }, [version, book, chapter]); 

  

  return (
    <div className="container mx-auto p-4">
      <Model>
        <div className="grid grid-cols-7 gap-3">
          <div className="w-100 m-3 col-span-2">
            <CustomSelect data={version_key_pairs} handleChange={setVersion} heading={"Version"} />
          </div>
          <div className="w-100 m-3 col-span-2">
            <CustomSelect data={font_name_class} handleChange={setFontClass} heading={"Font"} />
          </div>
          
        </div>
      <div className="grid grid-cols-4 gap-4">
        <h1 className="col-span-2 block text-lg font-semibold mb-2 ps-2 sevillana-regular">Select Book</h1>
        <h1 className="block text-lg font-semibold mb-2  ps-2 sevillana-regular">Select Chapter</h1>
        <h1 className="block text-lg font-semibold mb-2  ps-2 sevillana-regular">Select Verse</h1>
      </div><div className="grid grid-cols-4 gap-4" style={{ height: "200px" }}>
        <div className="border col-span-2 overflow-y-scroll scroll_bar_blue shadow-lg p-2 rounded-lg">
          <BookNav books={booksData.map((b) => b.name)} onBookChange={handleBookChange} />
        </div>
        <div className="border overflow-y-scroll scroll_bar_blue shadow-lg p-2 rounded-lg">
          <ChapterNav
            chapter={chapter}
            chapters={Array.from({ length: book.chapter_count }, (_, i) => i + 1)}
            onChapterChange={handleChapterChange} />
        </div>
        <div className="border overflow-y-scroll scroll_bar_blue shadow-lg p-2 rounded-lg">
          <VerseNav
            verses={Array.from({ length: book.verses_count[chapter - 1] }, (_, i) => i + 1)}
            onVerseChange={handleVerseChange} />
        </div>
      </div>
      </Model>


      <>
      {loading ? (
          <Spinner />
        ) : (
          <ChapterDisplay
            book={book.name}
            chapter={chapter}
            verses={verses.verses}
            selectedVerse = {verse}
            fontClass = {fontClass}
          />
        )}
      </>
    </div>
  );
};



export default App;
