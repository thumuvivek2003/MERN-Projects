import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { GoogleMap, LoadScript, AdvancedMarkerElement } from '@react-google-maps/api';

// Initialize Firebase (make sure to use your own config)
const firebaseConfig = {
  apiKey: "AIzaSyA0KGBY_MxstvRE_nfFL6ZpNyXjaiq1wAg",
  authDomain: "floodlocator2.firebaseapp.com",
  projectId: "floodlocator2",
  storageBucket: "floodlocator2.appspot.com",
  messagingSenderId: "589425039100",
  appId: "1:589425039100:web:34e5cf9b85b95609a2e979"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Replace with your actual Google Maps API Key
const GOOGLE_MAPS_API_KEY = "AIzaSyAeTt9WseoYm9IPgbUM9q3WXOtoYbhNnvg";

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'floodReports'));
      const locationData = querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            lat: data.location?.latitude,
            lng: data.location?.longitude
          };
        })
        .filter(location => location.lat && location.lng);

      setLocations(locationData);
      console.log(locationData);

      // Set the center to the first location or default to (0, 0)
      if (locationData.length > 0) {
        setCenter({ lat: locationData[0].lat, lng: locationData[0].lng });
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching locations: ", err);
      setError("Failed to fetch locations. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Flood Report Locations</h1>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
        >
          {locations.map((location) => (
            <AdvancedMarkerElement
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Locations;