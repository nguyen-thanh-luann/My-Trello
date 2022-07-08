import React, { useState, useEffect } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { isEmpty } from 'lodash'
import './BoardContent.scss'

import Column from '../Column/Column'
import { mapOrder } from '../../utilities/sorts'
import { applyDrag } from '../../utilities/dragDrop'
import { initialData } from '../../actions/initialData'
import { AiOutlinePlus } from 'react-icons/ai'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === 'board-1'
    )
    if (boardFromDB) {
      setBoard(boardFromDB)
      // sort column

      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])

  if (isEmpty(board)) {
    return (
      <div className='not-found BoardContent text-warning'>Board not found</div>
    )
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns]
    let newBoard = { ...board }
    newColumns = applyDrag(newColumns, dropResult)
    newBoard.columnOrder = newColumns.map((col) => col.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns]
      let currentColumn = newColumns.find((c) => c.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map((i) => i.id)

      setColumns(newColumns)
    }
  }

  return (
    <>
      <div className='BoardContent'>
        <Container
          orientation='horizontal'
          onDrop={onColumnDrop}
          getChildPayload={(index) => columns[index]}
          dragHandleSelector='.column-drag-handle'
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview',
          }}
        >
          {columns.map((column, index) => (
            <Draggable key={index}>
              <Column column={column} onCardDrop={onCardDrop} />
            </Draggable>
          ))}
        </Container>
        <div className='addNewColumn'>
          <AiOutlinePlus />
          <span>Thêm danh sách khác</span>
        </div>
      </div>
    </>
  )
}

export default BoardContent
