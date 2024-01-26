import PropTypes from 'prop-types';
import hangmanImg from '../../../assets/cartucho-hangman.webp';
import tictactoeImg from '../../../assets/cartucho-Tictactoe.webp';
import sudokuImg from '../../../assets/cartucho-sudoku.webp';
import CardItem from './cardItem';

const images = [
  {
    src: hangmanImg,
    alt: 'Hangman',
    details: 'Letter by letter, guess or swing  💀',
    flipped: false
  },
  {
    src: tictactoeImg,
    alt: 'Tic Tac Toe',
    details: "Crosses and noughts, a quick thought's bout",
    flipped: false
  },
  { src: sudokuImg, alt: 'Sudoku', details: 'Numbers align, a puzzle divine', flipped: false }
];

function Card({ onCardClick }) {
  return (
    <div className="carousel">
      {images.map((image, index) => (
        <CardItem key={index} image={image} onCardClick={onCardClick} />
      ))}
    </div>
  );
}

Card.propTypes = {
  onCardClick: PropTypes.func.isRequired
};

export default Card;
