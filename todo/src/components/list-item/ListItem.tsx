import React, { useState } from 'react';
import './ListItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ITodo } from '../../interface/ITodo';

interface IPropType {
  todoitem: ITodo;
  onDelete: () => void;
  onUpdate: (item: ITodo) => void;
}

function ListItem({todoitem, onDelete, onUpdate } : IPropType) {
  const[todo, setTodo] = useState(todoitem);
  const[isUpdate, setUpdate] = useState(false);

  return (
    <li className="list-item">
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={() => {
          setTodo({...todo, isDone: !todo.isDone});
          onUpdate({...todo, isDone: !todo.isDone});
        }}/>
      <FontAwesomeIcon className='checkbox-icon' icon={faCheck} />
    {
    isUpdate ?
      <div className='text-update'>
        <input
          type="text"
          value={todo.mission}
          onChange={(event) => (setTodo({...todo, mission: event.target.value}))} />
        <div className="save-button" onClick={() => (setUpdate(false))}>Save</div>
      </div>
      :
      <div className="list-item-text">{todo.mission}</div>
    }
    <div className="list-item-date">{todo.date}</div>
    <ul className="list-item-menu">
        <li className="menu-item">
          <FontAwesomeIcon icon={faTrashCan} onClick={onDelete}/>
        </li>
        <li className="menu-item" onClick={() => setUpdate(true)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </li>
    </ul>
    </li>
  );
}

export default ListItem;
