import React from 'react';
import './CharacterCard.css';
function CharacterCard({ character }) {
    const imageUrl = `/src/myApps/DisneyCharacter/components/${character.imageUrl}`;
  return (
    <div className="character-card" style={{ backgroundColor: character.color }}>
        <div style={{position:'relative'}}>
            <img src={imageUrl} alt={character.name} className="character-image" />
        </div>
        <div>
            <h2>{character.name}</h2>
            <p>Movie: {character.movie}</p>
        </div>
    </div>
  );
}

export default CharacterCard;
