// Filename - firebse.js

import firebase from "firebase";
const firebaseConfig = {
    // Add your firebase credentials
    apiKey: "your api key",
    authDomain: "your credentials",
    projectId: "your credentials",
    storageBucket: "your credentials",
    messagingSenderId: "your credentials",
    appId: "your credentials",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export default db;
