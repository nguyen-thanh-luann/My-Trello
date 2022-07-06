import React from 'react';
import './Card.scss';
function Card(props) {
  const { card } = props;
  return (
    <>
      <div className='card'>
        <div className='card-img'>
          {card.cover && <img src={card.cover} alt='cart img' />}
        </div>
        <div className='card-content'>
          <p>{card.title}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
