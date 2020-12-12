import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
function Display(props) {
  const { id, task, removeTask, completeTask } = props;

  return (
    <li>
      <div className='main-container'>
     
        <div className={task.done ? 'text-container cross' : 'text-container'}>
          {task.text} {task.done}
        </div>
        <div className='action-container'>
          <Checkbox
            color='primary'
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            onChange={() => completeTask(id)}
          />

          <IconButton
            aria-label='delete'
            color='secondary'
            onClick={() => removeTask(id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </li>
  );
}

export default Display;
