import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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