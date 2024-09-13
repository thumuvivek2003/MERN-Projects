import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useGeolocated } from "react-geolocated";

// Firebase related
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
const storage = getStorage(app);

const Client = () => {
  const [phoneNumbers, setPhoneNumbers] = useState(["7032988615"]);
  const [peopleAtRisk, setPeopleAtRisk] = useState("2");
  const [peoplePhotos, setPeoplePhotos] = useState([]);
  const [surroundingPhotos, setSurroundingPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Geolocation setup
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  // Handle Phone Number Change
  const handlePhoneNumberChange = (index, value) => {
    const mobile = value.replace(/\D/g, "").slice(0, 10); // Allow only 10 digits
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = mobile;
    setPhoneNumbers(newPhoneNumbers);
  };

  // Add Phone Number Field
  const addPhoneNumber = () => {
    if (phoneNumbers.length < 5) {
      setPhoneNumbers([...phoneNumbers, ""]);
    }
  };

  // Remove Phone Number Field
  const removePhoneNumber = (index) => {
    const updatedNumbers = phoneNumbers.filter((_, idx) => idx !== index);
    setPhoneNumbers(updatedNumbers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate each phone number is exactly 10 digits
    for (let i = 0; i < phoneNumbers.length; i++) {
      if (phoneNumbers[i].length !== 10) {
        setError(`Phone number ${i + 1} must be exactly 10 digits`);
        isValid = false;
        break;
      }
    }

    if (!coords) {
      setError("Location data is not available. Please ensure location access is enabled.");
      isValid = false;
    }

    if (isValid) {
      setError(null);
      setIsSubmitting(true);

      try {
        // Upload photos to Firebase Storage
        const uploadFileToStorage = async (file, folderName) => {
          const storageRef = ref(storage, `${folderName}/${file.name}`);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        };

        // Upload people photos
        const peoplePhotoUrls = await Promise.all(
          peoplePhotos.map((photo) => uploadFileToStorage(photo, 'peoplePhotos'))
        );

        // Upload surrounding photos
        const surroundingPhotoUrls = await Promise.all(
          surroundingPhotos.map((photo) => uploadFileToStorage(photo, 'surroundingPhotos'))
        );

        // Add data to Firestore
        await addDoc(collection(db, 'floodReports'), {
          phoneNumbers,
          location: { latitude: coords.latitude, longitude: coords.longitude },
          peopleAtRisk: parseInt(peopleAtRisk, 10),
          peoplePhotos: peoplePhotoUrls,
          surroundingPhotos: surroundingPhotoUrls,
          timestamp: serverTimestamp(),
        });

        // Reset form fields
        setPhoneNumbers([""]); // Reset to a single empty phone number
        setPeopleAtRisk("0");
        setPeoplePhotos([]);
        setSurroundingPhotos([]);

        // Success message
        alert('Report submitted successfully!');
      } catch (error) {
        console.error('Error submitting report:', error);
        setError('An error occurred while submitting the report. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Flood Locator Report</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {phoneNumbers.map((number, index) => (
          <div key={index} className="mb-4 flex items-center space-x-2">
            <input
              type="tel"
              value={number}
              onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={index === 0 ? "Phone Number (required)" : "Additional Phone Number"}
              required={index === 0} // First phone number is required
            />
            {index !== 0 && (
              <button
                type="button"
                onClick={() => removePhoneNumber(index)}
                className="bg-red-500 text-white p-3 rounded hover:bg-red-600 transition duration-200"
              >
                <AiOutlineDelete />
              </button>
            )}
          </div>
        ))}
        {phoneNumbers.length < 5 && (
          <div>
            <button
              type="button"
              onClick={addPhoneNumber}
              className="flex items-center text-blue-500 hover:text-blue-600 transition duration-200"
            >
              <FaPlus className="mr-1" />
              Add Phone Number
            </button>
          </div>
        )}

        {/* Display Geolocation */}
        <div>
          {coords ? (
            <p className="mt-2 text-sm text-gray-600">
              Location: {coords.latitude}, {coords.longitude}
            </p>
          ) : (
            <p className="mt-2 text-sm text-red-600">
              {isGeolocationAvailable
                ? isGeolocationEnabled
                  ? "Getting location..."
                  : "Location access denied."
                : "Geolocation not available on this device."}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of People at Risk:
          </label>
          <input
            type="number"
            value={peopleAtRisk}
            onChange={(e) => setPeopleAtRisk(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Photos of People (up to 2):
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setPeoplePhotos(Array.from(e.target.files).slice(0, 2))}
            className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Surrounding Photos (up to 5):
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setSurroundingPhotos(Array.from(e.target.files).slice(0, 5))}
            className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* People Photos */}
          {peoplePhotos.map((photo, index) => (
            <div key={index} className="w-full h-40">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Person ${index + 1}`}
                className="w-full h-full object-cover rounded-md shadow-lg"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {/* Surrounding Photos */}
          {surroundingPhotos.map((photo, index) => (
            <div key={index} className="w-full h-40">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Surrounding ${index + 1}`}
                className="w-full h-full object-cover rounded-md shadow-lg"
              />
            </div>
          ))}
        </div>

        {/* Display Error Message */}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default Client;