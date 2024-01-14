import Slider from 'react-slick';
import hangmanImg from '../../../assets/hangmanBackground.jpg';
import tictactoeImg from '../../../assets/ticTacToeBackground.png';
import sudokuImg from '../../../assets/SudokuBackground.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import './home.css';

const images = [hangmanImg, tictactoeImg, sudokuImg];

function Home() {
  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 3,
    speed: 500,
    focusOnSelect: true,
    variableWidth: true
  };

  return (
    <div className="home-container">
      <h1>welcome Retro Games Hub</h1>
      <div className="linksImg-container">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="img-links">
              <img src={image} alt={`game${index}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Home;
