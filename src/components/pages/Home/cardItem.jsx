import PropTypes from 'prop-types';
import { useState } from 'react';

function CardItem({ image, onCardClick }) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
    onCardClick();
  };

  return (
    <div
      className={`card ${flipped ? 'flipped' : ''}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleClick();
      }}
      role="button"
      tabIndex={0}
    >
      <div className="inner-card">
        <div className="front">
          <img src={image.src} alt={image.alt} className="game-image" />
        </div>
        <div className="back">
          <p>{image.details}</p>
        </div>
      </div>
    </div>
  );
}

CardItem.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired
  }).isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default CardItem;
