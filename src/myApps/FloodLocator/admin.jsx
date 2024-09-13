import React, { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { FaClockRotateLeft } from "react-icons/fa6";


import { formatDistanceToNow } from 'date-fns';



import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Initialize Firebase (make sure to use your own config)
const firebaseConfig = {
  apiKey: "AIzaSyA0KGBY_MxstvRE_nfFL6ZpNyXjaiq1wAg",
  authDomain: "floodlocator2.firebaseapp.com",
  projectId: "floodlocator2",
  storageBucket: "floodlocator2.appspot.com",
  messagingSenderId: "589425039100",
  appId: "1:589425039100:web:34e5cf9b85b95609a2e979",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Admin = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the fetchReports function to set up real-time listener
    const fetchReports = () => {
      // Create a query that orders the reports by 'timestamp' in descending order
      const reportsQuery = query(
        collection(db, "floodReports"),
        orderBy("timestamp", "desc")
      );
  
      const unsubscribe = onSnapshot(
        reportsQuery,
        (querySnapshot) => {
          const reportData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate().toLocaleString() || "N/A",
          }));
          setReports(reportData);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching reports: ", err);
          setError("Failed to fetch reports. Please try again later.");
          setLoading(false);
        }
      );
  
      // Cleanup listener on component unmount
      return () => unsubscribe();
    };
  
    // Call fetchReports to start listening to changes
    fetchReports();
  }, []);
  const handlePick = async (reportId) => {
    try {
      // In a real app, you'd get the current user's ID from your auth system
      const currentUserId = "vivek"; // Placeholder user ID
      await updateDoc(doc(db, "floodReports", reportId), {
        pickedBy: currentUserId,
      });
      // Refresh the reports
      await fetchReports();
      alert("Report picked successfully!");
    } catch (err) {
      console.error("Error picking report: ", err);
      alert("Failed to pick report. Please try again.");
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Flood Reports Admin Panel
      </h1>
      {reports.map((report) => {
        const timestamp = new Date(report.timestamp);
        const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true });

        return (
          <div key={report.id} className="mb-8 p-4 border rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Report ID: {report.id}</h2>
              <button
                onClick={() => handlePick(report.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={report.pickedBy}
              >
                {report.pickedBy ? `Picked By ${report.pickedBy}` : "I'll Pick"}
              </button>
            </div>
            <div className="flex">
              {report.phoneNumbers?.map((phoneNumber, index) => (
                <div
                  key={index}
                  className="group my-3 mx-2 inline-flex flex-wrap justify-center items-center gap-2"
                >
                  <button
                    className="rounded-full border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800"
                    type="button"
                    onClick={() => (window.location.href = `tel:${phoneNumber}`)}
                  >
                    <FaPhoneAlt />
                  </button>
                </div>
              ))}

              <div className="group my-3 mx-2 inline-flex flex-wrap justify-center items-center gap-2">
                <button
                  className="rounded-full border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800"
                  type="button"
                  onClick={() =>
                    (window.location.href = `https://www.google.com/maps/search/?api=1&query=${report.location.latitude},${report.location.longitude}`)
                  }
                >
                  <IoLocation />
                </button>
              </div>

              <div className="group my-3 mx-2 inline-flex flex-wrap justify-center items-center gap-2">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  {report.peopleAtRisk || "N/A"} At Risk
                </button>
              </div>

              <div className="group my-3 mx-2 inline-flex flex-wrap justify-center items-center gap-2">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900 flex gap-2"
                >
                  <FaClockRotateLeft />
                  {timeAgo}
                </button>
              </div>
            </div>

            <h3 className="font-semibold mt-4 mb-2">Photos:</h3>
            <div className="grid grid-cols-2 gap-1 p-2">
              {report.peoplePhotos?.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Person ${index + 1}`}
                  className="p-2 border w-full object-contain rounded-md"
                />
              ))}

              {report.surroundingPhotos?.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Surrounding ${index + 1}`}
                  className="p-2 border w-full object-contain rounded-md"
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
