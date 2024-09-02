import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import ProfileCard from './ProfileCard';

function App() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);0

  const searchUsers = async () => {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${query}&order=desc`);
      setUsers(response.data.items);
      console.log(users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (query) {
      searchUsers();
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search GitHub users..."
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={searchUsers}
            className="ml-3 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            <FaSearch />
          </button>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <ProfileCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
