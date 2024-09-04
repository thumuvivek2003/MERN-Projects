import React, { useState } from 'react';
import ThemeSelect from './ThemeSelect';
import themes from './themes';  // Import your themes object here

const App = () => {
  const [currentTheme, setCurrentTheme] = useState('light');

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
  };

  const theme = themes[currentTheme];

  return (
    <div className={`${theme.bgColor} min-h-screen p-4`}>
      <ThemeSelect themes={themes} handleChange={handleThemeChange} heading="Theme" />
      
      <div className={`${theme.cardColor} p-6 rounded-lg shadow-lg`}>
        <h1 className={`${theme.headingColor} text-2xl font-bold mb-4`}>Welcome to {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Theme</h1>
        <p className={`${theme.textColor} text-base`}>
          This is a paragraph styled with the selected theme's text color.
        </p>
      </div>
    </div>
  );
};

export default App;
