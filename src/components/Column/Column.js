import React from 'react';
import './Column.scss';
import { AiOutlineEllipsis } from 'react-icons/ai';

import Task from '../Task/Task';
function Column() {
  return (
    <>
      <div className='column'>
        <div className='column-header'>
          <p className='title'>Back log </p>
          <AiOutlineEllipsis className='option' />
        </div>
        <div className='column-body'>
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
          <Task />
        </div>

        <div className='column-footer'></div>
      </div>
    </>
  );
}

export default Column;
