import React from 'react';

const ThemeSelect = ({ themes, handleChange, heading }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="w-100 m-3 col-span-2">
        <label htmlFor="theme" className="block mb-2 text-sm font-medium">
          Select {heading}
        </label>
        <select
          id="theme"
          onChange={(e) => handleChange(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          {Object.keys(themes).map((theme) => (
            <option key={theme} value={theme}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ThemeSelect;
