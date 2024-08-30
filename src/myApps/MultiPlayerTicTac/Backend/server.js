import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});

app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

io.on('connection', (socket) => {
  console.log('Connected!');

  socket.on('makeMove', (move) => {
    fs.readFile(path.join(__dirname, 'game_state.json'), 'utf8', (err, data) => {
      if (err) throw err;
      const gameState = JSON.parse(data);

      gameState.moves.push(move);

      fs.writeFile(path.join(__dirname, 'game_state.json'), JSON.stringify(gameState), (err) => {
        if (err) throw err;
        io.emit('gameState', gameState);
      });
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
