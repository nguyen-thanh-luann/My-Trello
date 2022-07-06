import React from 'react';
import './Column.scss';
import { AiOutlineEllipsis } from 'react-icons/ai';

import Card from '../Card/Card';
import { mapOrder } from '../../utilities/sorts';

function Column(props) {
  const { column } = props;
  const cards = mapOrder(column.cards, column.cardOrder, 'id');

  return (
    <>
      <div className='column'>
        <div className='column-header'>
          <p className='title'>{column.title}</p>
          <AiOutlineEllipsis className='option' />
        </div>
        <div className='column-body'>
          {cards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>

        <div className='column-footer'>
          <p>Add another cart</p>
        </div>
      </div>
    </>
  );
}

export default Column;
