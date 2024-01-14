import { useState, useEffect } from 'react';
import ticTacToeBackground from '../../../assets/ticTacToeBackground.png';
import XIcon from '../../../assets/ticTacToeX.png';
import OIcon from '../../../assets/ticTacToeO.png';
import './TicTacToe.css';

function TicTacToe() {
  const [isStarted, setIsStarted] = useState(false);
  const [player, setPlayer] = useState('X');
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill(null)));
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    // Establecer fondo
    document.body.style.backgroundImage = `url(${ticTacToeBackground})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';

    return () => {
      // Limpiar al desmontar
      document.body.style.backgroundImage = '';
    };
  }, []);

  const startGame = () => {
    setIsStarted(true);
  };

  const endGame = () => {
    setIsStarted(false);
    setBoard(Array(3).fill(Array(3).fill(null)));
    setPlayer('X');
    setWinner(null);
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

  useEffect(() => {
    const checkWinner = () => {
      // Comprobar filas, columnas y diagonales
      for (let i = 0; i < 3; i += 1) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
          setWinner(board[i][0]);
          return;
        }

        if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
          setWinner(board[0][i]);
          return;
        }
      }

      if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        setWinner(board[0][0]);
        return;
      }

      if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        setWinner(board[0][2]);
        return;
      }

      // Comprobar empate
      if (board.every((row) => row.every((cell) => cell))) {
        setWinner('Empate');
      }
    };

    checkWinner();
  }, [board]);

  const renderCell = (cellValue) => {
    switch (cellValue) {
      case 'X':
        return <img src={XIcon} alt="X" className="tic-tac-toe-icon" />;
      case 'O':
        return <img src={OIcon} alt="O" className="tic-tac-toe-icon" />;
      default:
        return null;
    }
  };

  return (
    <div id="TTTContainer">
      <button
        onClick={isStarted ? endGame : startGame}
        type="button"
        className={`game-button ${isStarted ? 'end' : 'start'}`}
      >
        {isStarted ? 'End Game' : 'Start Game'}
      </button>
      {isStarted && (
        <div className="turn">
          <h3>Player&apos;s Turn: {player}</h3>
        </div>
      )}
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="tic-tac-toe-row">
            {row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className="tic-tac-toe-cell"
                type="button"
              >
                {renderCell(cell)}
              </button>
            ))}
          </div>
        ))}
      </div>
      {winner && (
        <div className="winner">
          <p>Winner: {winner}</p>
        </div>
      )}
    </div>
  );
}

export default TicTacToe;
