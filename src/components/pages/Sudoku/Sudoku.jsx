import { useState, useEffect, useRef } from 'react';
import sudoku from 'sudoku';
import sudokuBackground from '../../../assets/SudokuBackground.webp';
import sudokuMusic from '../../../assets/SudokuMusic.mp3';
import './sudoku.css';

function Sudoku() {
  const [isMuted, setIsMuted] = useState(false);
  const musicRef = useRef(new Audio(sudokuMusic));

  const [sudokuBoard, setSudokuBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const newBoard = sudoku.makepuzzle();
    setSudokuBoard(newBoard);
  }, []);

  const handleInputChange = (index, value) => {
    const newBoard = [...sudokuBoard];
    newBoard[index] = value === '' ? null : parseInt(value, 10);
    setSudokuBoard(newBoard);
  };

  const renderCell = (value, index) => {
    return (
      <input
        type="number"
        min="1"
        max="9"
        value={value === null ? '' : value}
        onChange={(e) => handleInputChange(index, e.target.value)}
        disabled={value !== null}
        className="sudoku-cell"
      />
    );
  };

  const resetGame = () => {
    const newBoard = sudoku.makepuzzle();
    setSudokuBoard(newBoard);
    setGameOver(false);
  };
  useEffect(() => {
    resetGame();
  }, []);

  const checkWin = () => {
    if (sudokuBoard.includes(null)) {
      return false; // Aún hay celdas vacías
    }
    // Intenta resolver el puzzle basado en el estado actual del tablero
    const solvedBoard = sudoku.solvepuzzle(sudokuBoard);

    // Si no se pudo resolver (es decir, si devuelve null), entonces el tablero es inválido
    if (!solvedBoard) {
      return false;
    }

    // Si todas las celdas están llenas y el puzzle se puede resolver, el usuario ha ganado
    return true;
  };

  const handleSubmit = () => {
    if (checkWin()) {
      setGameOver(true);
    } else {
      alert('Aún no has completado el Sudoku correctamente.');
    }
  };

  // music
  useEffect(() => {
    // Configurar música
    const music = musicRef.current;
    music.loop = true;
    music.play();

    return () => {
      // Limpiar al desmontar
      music.pause();
    };
  }, []);

  useEffect(() => {
    // Controlar silencio
    const music = musicRef.current;
    if (isMuted) {
      music.pause();
    } else {
      music.play();
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // backgroundImage
  useEffect(() => {
    // Establecer fondo
    document.body.style.backgroundImage = `url(${sudokuBackground})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';

    return () => {
      // Limpiar al desmontar
      document.body.style.backgroundImage = '';
    };
  }, []);

  return (
    <div className="sudoku-container">
      <div className="sudoku-board">
        {sudokuBoard.map((value, index) => (
          <div key={index} className="sudoku-cell-wrapper">
            {renderCell(value, index)}
          </div>
        ))}
      </div>
      <div className="buttons">
        <button className="Sbuttons" onClick={resetGame} type="button">
          Reset
        </button>
        <button className="Sbuttons" onClick={handleSubmit} disabled={gameOver} type="button">
          check it
        </button>
        <button className="Sbuttons" onClick={toggleMute} type="button">
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>
      {gameOver && (
        <div className="completion-message">
          <h2>¡Felicidades! Has completado el Sudoku.</h2>
        </div>
      )}
    </div>
  );
}

export default Sudoku;
