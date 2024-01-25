import PropTypes from 'prop-types';
import hangmanImg from '../../../assets/cartucho-hangman.png';
import tictactoeImg from '../../../assets/cartucho-Tictactoe.png';
import sudokuImg from '../../../assets/cartucho-sudoku.png';
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
