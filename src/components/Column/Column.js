import React, { useEffect, useState } from 'react'
import './Column.scss'
import { AiOutlinePlus } from 'react-icons/ai'
import { Dropdown, DropdownButton, Form } from 'react-bootstrap'
import { Container, Draggable } from 'react-smooth-dnd'

import Card from '../Card/Card'
import ConfirmModal from '../Common/ConfirmModal'
import { mapOrder } from '../../utilities/sorts'

function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props
  const cards = mapOrder(column.cards, column.cardOrder, 'id')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')

  const handleColumnTileChange = (e) => {
    setColumnTitle(e.target.value)
  }

  const handleColumnTileBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle,
    }
    onUpdateColumn(newColumn)
  }

  const saveColumnTitle = (e) => {
    if (e.key === 'Enter') {
      e.target.blur()
    }
  }

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  const toggleShowConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal)
  }

  const onConfirmModalAction = (type) => {
    if (type === 'confirm') {
      const newColumn = {
        ...column,
        _destroy: true,
      }
      onUpdateColumn(newColumn)
    }

    toggleShowConfirmModal()
  }

  const selectAllText = (e) => {
    e.target.focus()
    e.target.select()
  }

  return (
    <>
      <div className='column'>
        <div className='column-header column-drag-handle'>
          <Form.Control
            size='sm'
            type='text'
            className='column-title'
            value={columnTitle}
            spellCheck='false'
            onClick={selectAllText}
            onChange={(e) => handleColumnTileChange(e)}
            onBlur={handleColumnTileBlur}
            onKeyDown={saveColumnTitle}
            onMouseDown={(e) => e.preventDefault()}
          />
          <DropdownButton
            title=''
            id='column-option-btn'
            className='column-option-btn'
          >
            <Dropdown.Item href='#'>Add card</Dropdown.Item>
            <Dropdown.Item onClick={toggleShowConfirmModal}>
              Remove column
            </Dropdown.Item>
            <Dropdown.Item href='#'>Something else here</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href='#'>Separated link</Dropdown.Item>
          </DropdownButton>
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

        <ConfirmModal
          show={showConfirmModal}
          onAction={onConfirmModalAction}
          title='Remove column'
          content={`Are you sure remove list ${column.title}`}
        />
      </div>
    </>
  )
}

export default Column
