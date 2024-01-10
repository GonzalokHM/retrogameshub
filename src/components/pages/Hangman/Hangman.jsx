import './Hangman.css';

import { useState, useEffect, useRef } from 'react';

const words = [
  'apple',
  'banana',
  'cherry',
  'date',
  'berry',
  'car',
  'mouse',
  'honeydew',
  'kiwi',
  'house',
  'mango',
  'bike',
  'orange',
  'neuron',
  'quantum'
];
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function Hangman() {
  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      if (remainingAttempts <= 0) {
        setGameOver(true);
        setGameWon(false);
      } else if (currentWord.split('').every((letter) => guessedLetters.includes(letter))) {
        setGameOver(true);
        setGameWon(true);
      }
    }
  }, [guessedLetters, remainingAttempts, currentWord, gameStarted]);

  const startGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setGuessedLetters([]);
    setWrongLetters([]);
    setRemainingAttempts(6);
    setGameStarted(true);
    setGameOver(false);
    setGameWon(false);
  };

  const makeGuess = (letter) => {
    if (gameOver || guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
      return; // Ignorar letras ya adivinadas o erróneas
    }

    if (currentWord.includes(letter)) {
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    } else {
      setWrongLetters((currentLetters) => [...currentLetters, letter]);
      setRemainingAttempts((currentAttempts) => currentAttempts - 1);
    }
  };

  const renderWord = () => {
    return currentWord
      .split('')
      .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
      .join(' ');
  };

  const renderAlphabetButtons = () => {
    return alphabet.map((letter, index) => (
      <button
        key={index}
        onClick={() => makeGuess(letter)}
        disabled={guessedLetters.includes(letter) || wrongLetters.includes(letter)}
        type="button"
      >
        {letter.toUpperCase()}
      </button>
    ));
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    // Dibujar base (siempre visible)
    context.beginPath();
    context.moveTo(10, 130);
    context.lineTo(140, 130);
    context.stroke();

    if (remainingAttempts <= 5) {
      // Dibujar poste
      context.beginPath();
      context.moveTo(75, 130);
      context.lineTo(75, 10);
      context.lineTo(125, 10);
      context.lineTo(125, 20);
      context.stroke();
    }
    if (remainingAttempts <= 4) {
      // Dibujar cabeza
      context.beginPath();
      context.arc(125, 30, 10, 0, Math.PI * 2, true);
      context.stroke();
    }
    if (remainingAttempts <= 3) {
      // Dibujar cuerpo
      context.beginPath();
      context.moveTo(125, 40);
      context.lineTo(125, 80);
      context.stroke();
    }
    if (remainingAttempts <= 2) {
      // Dibujar brazo izquierdo
      context.beginPath();
      context.moveTo(125, 50);
      context.lineTo(110, 60);
      context.stroke();
    }
    if (remainingAttempts <= 1) {
      // Dibujar brazo derecho
      context.beginPath();
      context.moveTo(125, 50);
      context.lineTo(140, 60);
      context.stroke();
    }
    if (remainingAttempts <= 0) {
      // Dibujar pierna izquierda
      context.beginPath();
      context.moveTo(125, 80);
      context.lineTo(110, 100);
      context.stroke();

      // Dibujar pierna derecha
      context.beginPath();
      context.moveTo(125, 80);
      context.lineTo(140, 100);
      context.stroke();
    }
  }, [remainingAttempts]);

  return (
    <div>
      <button onClick={startGame} type="button">
        Start Game
      </button>
      {gameStarted && <div>Palabra: {renderWord()}</div>}
      {gameStarted && <div>Letras Erróneas: {wrongLetters.join(', ')}</div>}
      {gameStarted && <div>Vidas Restantes: {remainingAttempts}</div>}
      {gameStarted && <div>{renderAlphabetButtons()}</div>}
      {gameOver && <div>{gameWon ? '¡you win!' : 'Game Over'}</div>}
      <div>
        <canvas ref={canvasRef} width="150" height="150" />
      </div>
    </div>
  );
}

export default Hangman;
