import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap'
import { isEmpty } from 'lodash'
import './BoardContent.scss'

import Column from '../Column/Column'
import { mapOrder } from '../../utilities/sorts'
import { applyDrag } from '../../utilities/dragDrop'
import { initialData } from '../../actions/initialData'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [listTitle, setListTitle] = useState('')

  const listTitleRef = useRef(null)

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

  useEffect(() => {
    if (listTitleRef && listTitleRef.current) {
      listTitleRef.current.focus()
      listTitleRef.current.select()
    }
  }, [openNewColumnForm])

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

  const onUpdateColumn = (columnUpdate) => {
    const columnIdUpdate = columnUpdate.id
    let newColumns = [...columns]
    const columnUpdateIndex = newColumns.findIndex(
      (i) => i.id === columnIdUpdate
    )
    if (columnUpdate._destroy) {
      newColumns.splice(columnUpdateIndex, 1)
    } else {
      newColumns.splice(columnUpdateIndex, 1, columnUpdate)
    }

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map((col) => col.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
  }

  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const addNewColumn = () => {
    if (!listTitle) {
      listTitleRef.current.focus()
      return
    }

    const newColumn = {
      id: Math.random().toString(36).substring(2, 5), //5 random char
      boardId: board.id,
      title: listTitle.trim(),
      cardOrder: [],
      cards: [],
    }

    let newColumns = [...columns]
    newColumns.push(newColumn)

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map((col) => col.id)
    newBoard.columns = newColumns

    setColumns(newColumns)
    setBoard(newBoard)
    setListTitle('')
    toggleOpenNewColumnForm()
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
              <Column
                column={column}
                onCardDrop={onCardDrop}
                onUpdateColumn={onUpdateColumn}
              />
            </Draggable>
          ))}
        </Container>
        <BootstrapContainer>
          {!openNewColumnForm && (
            <Row className='me-2'>
              <Col
                className='addNewColumn'
                onClick={() => toggleOpenNewColumnForm()}
              >
                <AiOutlinePlus />
                <span>Add other list</span>
              </Col>
            </Row>
          )}
          {openNewColumnForm && (
            <Row className='me-2'>
              <Col className='enterNewColumn'>
                <Form.Control
                  size='sm'
                  type='text'
                  placeholder='Import list title...'
                  className='my-2'
                  ref={listTitleRef}
                  value={listTitle}
                  onChange={(e) => setListTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addNewColumn()}
                />
                <Button variant='success mb-1' onClick={addNewColumn}>
                  Add list
                </Button>
                <AiOutlineClose
                  className='btnClose'
                  onClick={() => toggleOpenNewColumnForm()}
                />
              </Col>
            </Row>
          )}
        </BootstrapContainer>
      </div>
    </>
  )
}

export default BoardContent
