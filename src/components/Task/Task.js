import React from 'react';
import './Task.scss';
function Task() {
  return (
    <>
      <div className='task'>
        <div className='task-img'>
          <img src={require('../../assets/img/trello-bgImg.jpg')} />
        </div>
        <div className='task-content'>
          <p>example task</p>
        </div>
      </div>
    </>
  );
}

export default Task;
