import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs,getFirestore} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

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



function FirestoreExample() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState('');

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(items);
    };

    fetchData();
  }, []);

  // Insert data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newItem.trim() === '') return;

    try {
      const docRef = await addDoc(collection(db, 'items'), {
        name: newItem,
        timestamp: new Date()
      });
      console.log('Document written with ID: ', docRef.id);
      setNewItem('');
      // Optionally, you can fetch the data again to update the list
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <h2>Firestore Example</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item"
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FirestoreExample;