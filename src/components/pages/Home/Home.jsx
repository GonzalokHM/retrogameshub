import { useState, useEffect, useRef } from 'react';
import homeMusic from '../../../assets/HomeMusic.mp3';
import Card from './cards';
import './home.css';

function Home() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const musicRef = useRef(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    // Configurar música
    if (musicRef.current) {
      musicRef.current.loop = true;
      if (isMusicPlaying) {
        musicRef.current.play().catch((e) => console.log('Error al reproducir la música:', e));
      } else {
        musicRef.current.pause();
      }
    }
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
      }
    };
  }, [isMusicPlaying]);

  const toggleMute = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  // primera interaccion con cards para reproducir musica
  const handleCardClick = () => {
    // Verifica si ya ha habido una interacción previa
    if (!hasInteractedRef.current) {
      // Si no la ha habido y muscRef es null, establece que la música se reproduzca y actualiza la ref
      if (!musicRef.current) {
        musicRef.current = new Audio(homeMusic);
      }
      setIsMusicPlaying(true);
      hasInteractedRef.current = true;
    }
  };

  return (
    <div className="home-container">
      <h1>welcome Retro Games Hub</h1>
      <Card onCardClick={handleCardClick} />
      <div>
        <button className="togle-music" onClick={toggleMute} type="button">
          {isMusicPlaying ? '🔇' : '🔊'}
        </button>
      </div>
    </div>
  );
}

export default Home;
