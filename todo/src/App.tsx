import React, { useState, useEffect } from 'react';
import './App.css';
import ListItem from './components/list-item/ListItem';
import AddListItem from './components/add-list-item/AddListItem';

function App() {
  let [todoArray, setTodoArray] = useState<{mission: string, id: number, isDone: boolean, date: string}[]>([]);

  useEffect(() => {
		for(let i = 0; i < localStorage.length; i++){
      setTodoArray((prev) => [...prev, JSON.parse(localStorage.getItem(localStorage.key(i)!)!)]);
    }
	}, []);

  const deleteTodoItem = (index: number, id: number) => {
    setTodoArray((prev) => {
      const updateArray = [...prev];
      updateArray.splice(index, 1);
      return updateArray;
    });
    localStorage.removeItem(`${id}`);
  }

  const createTodoItem = (item : {mission: string, id: number, isDone: boolean, date: string}) => {
    setTodoArray([...todoArray, item]);
  }

  return (
    <div className="app">
      <h1>Todo List</h1>
      <AddListItem onCreate={(item : {mission: string, id: number, isDone: boolean, date: string}) => createTodoItem(item)}/>
      <ul className='todo-list'>
        {
          todoArray.map((item, index) => (
              <ListItem todoitem={item} key={item.id} onDelete={() => deleteTodoItem(index, item.id)}/>
  ))}
      </ul>
    </div>
  );
}

export default App;
