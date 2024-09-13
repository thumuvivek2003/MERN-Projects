import React from 'react';

const ThemeSelect = ({ themes, selectedTheme,handleChange, heading }) => {
  return (
    <>
        <label htmlFor="theme" className="block mb-2 text-sm font-medium">
          Select {heading}
        </label>
        <select
          id="theme"
          onChange={(e) => handleChange(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {Object.keys(themes).map((theme) => (
            <option key={theme} value={theme} selected = {theme == selectedTheme}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
            </option>
          ))}
        </select>
    </>
  );
};

export default ThemeSelect;
