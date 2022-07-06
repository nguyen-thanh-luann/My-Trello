import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import './BoardContent.scss';

import Column from '../Column/Column';
import { mapOrder } from '../../utilities/sorts';
import { initialData } from '../../actions/initialData';

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFromDB = initialData.boards.find(
      (board) => board.id === 'board-1'
    );
    if (boardFromDB) {
      setBoard(boardFromDB);
      // sort column

      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'));
    }
  }, []);

  if (isEmpty(board)) {
    return (
      <div className='not-found BoardContent text-warning'>Board not found</div>
    );
  }

  return (
    <>
      <div className='BoardContent'>
        {columns.map((column, index) => {
          return <Column key={index} column={column} />;
        })}
      </div>
    </>
  );
}

export default BoardContent;
