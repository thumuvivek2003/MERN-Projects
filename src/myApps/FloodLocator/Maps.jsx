import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 37.7749, // Default center (San Francisco, for example)
  lng: -122.4194,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};



const Maps = ({ locations }) => {
  const [selected, setSelected] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Add your Google Maps API Key here
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  const handleMarkerClick = (location) => {
    setSelected(location);
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={options}
    >
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          onClick={() => handleMarkerClick(location)}
        />
      ))}

      {selected ? (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h2>{selected.cityName}</h2>
            <p>People at Risk: {selected.peopleCount}</p>
            <div>
              <strong>People Photos:</strong>
              {selected.peopleImages.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt="People at risk"
                  style={{ width: '50px', height: '50px', marginRight: '5px' }}
                />
              ))}
            </div>
            <div>
              <strong>Surrounding Photos:</strong>
              {selected.surroundingImages.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt="Surroundings"
                  style={{ width: '50px', height: '50px', marginRight: '5px' }}
                />
              ))}
            </div>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
};

export default Maps;
