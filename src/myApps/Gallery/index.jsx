import React, { useState, useEffect, useRef } from "react";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [theme, setTheme] = useState("light");
  const observer = useRef();

  // Fetch images from the Picsum API
  const fetchImages = async () => {
    const res = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=10`
    );
    const data = await res.json();
    setImages((prevImages) => [...prevImages, ...data]);
  };

  // Infinite scrolling logic
  useEffect(() => {
    fetchImages();
  }, [page]);

  // Observer to load more images when the last image is in view
  const lastImageElementRef = useRef();
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (lastImageElementRef.current) {
      observer.current.observe(lastImageElementRef.current);
    }

    return () => {
      if (lastImageElementRef.current) {
        observer.current.unobserve(lastImageElementRef.current);
      }
    };
  }, [lastImageElementRef]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <button
          className="p-2 bg-gray-800 text-white dark:bg-gray-300 dark:text-black"
          onClick={toggleTheme}
        >
          Toggle {theme === "light" ? "Dark" : "Light"} Theme
        </button>

        <div className="container mx-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => {
              if (index === images.length - 1) {
                return (
                  <div>
                    <img
                      ref={lastImageElementRef}
                      key={image.id}
                      src={image.download_url}
                      alt={image.author}
                      className="h-auto max-w-full rounded-lg"
                    />
                  </div>
                );
              }
              return (
                <div>
                  <img
                    key={image.id}
                    src={image.download_url}
                    alt={image.author}
                    className="h-auto max-w-full rounded-lg"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
