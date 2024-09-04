import React, { useState } from "react";
const BookNav = ({ books, onBookChange }) => {
  const [selectedBook, setSelectedBook] = useState(books[0]);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    onBookChange(book);
  };

  return (
    <div className="p-4 h-full">
      <div className="flex flex-wrap">
        {books.map((book, index) => (
          <button
            key={index}
            onClick={() => handleBookSelect(book)}
            className={`--in-custom px-4 py-2 m-1 text-sm font-medium rounded-lg ${
              book === selectedBook
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            } hover:bg-blue-500 hover:text-white focus:outline-none`}
          >
            {book}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookNav;
