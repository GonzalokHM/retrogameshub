import { useState, useEffect } from 'react';

function TicTacToe() {
  const [isStarted, setIsStarted] = useState(false);
  const [player, setPlayer] = useState('X');
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    // Aquí irá la lógica para comprobar si hay un ganador
  }, [board]);

  const startGame = () => {
    setIsStarted(true);
    setBoard(Array(3).fill(Array(3).fill(null)));
    setPlayer('X');
    setWinner(null);
  };

  const endGame = () => {
    setIsStarted(false);
  };

  const handleCellClick = (row, col) => {
    if (!isStarted || board[row][col] || winner) return;
    
    // Actualizar el tablero con el símbolo del jugador actual
    const newBoard = [...board];
    newBoard[row] = [...newBoard[row]];
    newBoard[row][col] = player;
    setBoard(newBoard);

    // Cambiar el turno al otro jugador
    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const checkWinner = () => {
    // Lógica para comprobar el ganador
  };

  return (
    <div>
      <button onClick={isStarted ? endGame : startGame}>
        {isStarted ? 'Terminar Partida' : 'Comenzar Partida'}
      </button>
      <div>Turno de: {player}</div>
      <div>
        {/* Aquí renderizaremos el tablero */}
      </div>
    </div>
  );
}

export default TicTacToe;
