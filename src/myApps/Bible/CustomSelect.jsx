import React from 'react';

const CustomSelect = ({ data, handleChange, heading }) => {
  return (
      <>
        <label htmlFor="version" className="block mb-2 text-sm font-medium">
          Select {heading}
        </label>
        <select
          id="version"
          onChange={(e) => handleChange(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {Object.entries(data).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </>
  );
};

export default CustomSelect;
