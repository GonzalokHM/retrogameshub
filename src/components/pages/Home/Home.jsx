import { useState, useEffect, useRef  } from 'react';
import hangmanImg from '../../../assets/cartucho-hangman.png';
import tictactoeImg from '../../../assets/cartucho-Tictactoe.png';
import sudokuImg from '../../../assets/cartucho-sudoku.png';
import homeMusic from '../../../assets/HomeMusic.mp3';
import './home.css';

const images = [
  {
    src: hangmanImg,
    desc: 'Hangman',
    details: 'descripcion del juego y copiRight',
    flipped: false
  },
  {
    src: tictactoeImg,
    desc: 'Tic Tac Toe',
    details: 'descripcion del juego y copiRight',
    flipped: false
  },
  { src: sudokuImg, desc: 'Sudoku', details: 'descripcion del juego y copiRight', flipped: false }
];

function Home() {
  const [carouselImages, setCarouselImages] = useState(images);

  const flipCard = (index) => {
    const newImages = [...carouselImages];
    newImages[index].flipped = !newImages[index].flipped;
    setCarouselImages(newImages);
  };

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter') {
      flipCard(index);
    }
  };

  const [isMuted, setIsMuted] = useState(false);
  const musicRef = useRef(new Audio(homeMusic));

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

  return (
    <div className="home-container">
      <h1>welcome Retro Games Hub</h1>
      <div className="carousel">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`card ${image.flipped ? 'flipped' : ''}`}
            onClick={() => flipCard(index)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            role="button"
            tabIndex={0}
          >
            <div className="inner-card">
              <div className="front">
                <img src={image.src} alt={`game${index}`} className="game-image" />
              </div>
              <div className="back">
                <p>{image.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button className="togle-music" onClick={toggleMute} type="button">
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
    </div>
  );
}

export default Home;
