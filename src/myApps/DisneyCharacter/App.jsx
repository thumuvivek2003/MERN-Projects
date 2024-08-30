import React from 'react';
import Header from './components/Header';
import CharacterCard from './components/CharacterCard';
import Navigation from './components/Navigation';
import './App.css';

const characters = [
  { name: 'Rosetta', movie: 'Tinkerbell', color: '#E53E3E', imageUrl: '/images/rosetta.png' },
  { name: 'Sadness', movie: 'Inside Out', color: '#3182CE', imageUrl: '/images/sadness.png' },
  { name: 'Disgust', movie: 'Inside Out', color: '#38A169', imageUrl: '/images/disgust.png' },
  // Add more characters as needed
];

function App() {
  return (
    <div className="app">
      <Header />
      <div className="characters">
        {characters.map((character, index) => (
            <CharacterCard key={index} character={character} />
        ))}
      </div>
      <div className="characters">
        {characters.map((character, index) => (
            <CharacterCard key={index} character={character} />
        ))}
      </div>
      <div className="characters">
        {characters.map((character, index) => (
            <CharacterCard key={index} character={character} />
        ))}
      </div>
      <div className="characters">
        {characters.map((character, index) => (
            <CharacterCard key={index} character={character} />
        ))}
      </div>
      <Navigation />
    </div>
  );
}

export default App;
