import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
import Login from './Login';

const socket = io('http://localhost:3000'); // Replace with your server address

function App() {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (name) => {
    setUsername(name);
    setLoggedIn(true);
    socket.emit('join', name);
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Chat socket={socket} username={username} />
      )}
    </div>
  );
}

export default App;
