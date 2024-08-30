import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './index.css';

const socket = io('http://localhost:3000'); // Ensure this URL matches your backend

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket.on('gameState', (gameState) => {
      const newBoard = Array(9).fill(null);
      gameState.moves.forEach((move) => {
        newBoard[move.index] = move.player;
      });
      setBoard(newBoard);
      setWinner(gameState.winner);
      setIsXNext(gameState.moves.length % 2 === 0);
    });

    return () => {
      socket.off('gameState');
    };
  }, []);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const move = { index, player: isXNext ? 'X' : 'O' };
    socket.emit('makeMove', move);

    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    socket.emit('resetGame');
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="reset-button" onClick={handleReset}>Reset Game</button>
    </div>
  );
}

export default App;
