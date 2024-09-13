// src/utils/geocoding.js

import axios from 'axios';

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

export const getCity = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.results.length > 0) {
      for (let result of response.data.results) {
        for (let component of result.address_components) {
          if (component.types.includes('locality')) {
            return component.long_name;
          }
        }
      }
    }
    return 'Unknown';
  } catch (error) {
    console.error('Error fetching city:', error);
    return 'Unknown';
  }
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          reject(new Error('Unable to retrieve your location'));
        }
      );
    }
  });
};