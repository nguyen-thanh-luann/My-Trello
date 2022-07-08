import React from 'react'
import './Column.scss'
import { AiOutlineEllipsis, AiOutlinePlus } from 'react-icons/ai'
import { Container, Draggable } from 'react-smooth-dnd'

import Card from '../Card/Card'
import { mapOrder } from '../../utilities/sorts'

function Column(props) {
  const { column, onCardDrop } = props
  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  return (
    <>
      <div className='column'>
        <div className='column-header column-drag-handle'>
          <p className='title'>{column.title}</p>
          <AiOutlineEllipsis className='option' />
        </div>
        <div className='column-body'>
          <Container
            groupName='col'
            onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
            getChildPayload={(index) => cards[index]}
            dragClass='card-ghost'
            dropClass='card-ghost-drop'
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: 'drop-preview',
            }}
            dropPlaceholderAnimationDuration={200}
          >
            {cards.map((card, index) => (
              <Draggable key={index}>
                <Card card={card} />
              </Draggable>
            ))}
          </Container>
        </div>

        <div className='column-footer'>
          <AiOutlinePlus />
          <span>Add another cart</span>
        </div>
      </div>
    </>
  )
}

export default Column
