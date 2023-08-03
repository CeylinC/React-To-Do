import React, { useState, useEffect } from 'react';
import './App.css';
import ListItem from './components/list-item/ListItem';
import AddListItem from './components/add-list-item/AddListItem';
import Navigation from './components/navigation/Navigation';
import { ITodo } from './interface/ITodo';


let display = "All";

function App() {
  let [todoArray, setTodoArray] = useState<ITodo[]>([]);
  let [displayArray, setDisplayArray] = useState<ITodo[]>([])

  useEffect(() => {
		for(let i = 0; i < localStorage.length; i++){
        setTodoArray((prev) => [...prev, JSON.parse(localStorage.getItem(localStorage.key(i)!)!)]);
    }
	}, []);

  useEffect(() => {
    todoArray.sort((a, b) => { return b.id - a.id; });
    setDisplayArray(todoArray);
    displayTypeTodoItem(display);
  }, [todoArray]);

  const deleteTodoItem = (index: number, id: number) => {
    setTodoArray((prev) => {
      const updateArray = [...prev];
      updateArray.splice(index, 1);
      return updateArray;
    });
    localStorage.removeItem(`${id}`);
  }

  const createTodoItem = (item : ITodo) => {
    setTodoArray([...todoArray, item]);
  }

  const UpdateTodoItem = (item : ITodo) => {
    localStorage.setItem(`${item.id}`, JSON.stringify(item));
    let tempArray = todoArray.map((i) => {
      if(i.id === item.id){
        return item;
      }
      return i;
    });
    setTodoArray(tempArray);
  }
  
  const displayTypeTodoItem = (displayType : string) => {
    display = displayType;
    switch (display){
      case "All":
        setDisplayArray(todoArray);
        break;
      case "Done":
        setDisplayArray(todoArray.filter((item) => item.isDone));
        break;
      case "Undone":
        setDisplayArray(todoArray.filter((item) => !item.isDone));
        break;
    }
  }

  return (
    <div className="app">
      <h1>Todo <div>List</div></h1>
      <div className='navigation'>
        <Navigation changeDisplay={(displayType: string) => displayTypeTodoItem(displayType)}/>
      </div>
      <AddListItem onCreate={(item : ITodo) => createTodoItem(item)}/>
      <ul className='todo-list'>
        {
          displayArray.map((item, index) => (
              <ListItem
                todoitem={item} key={item.id}
                onDelete={() => deleteTodoItem(index, item.id)}
                onUpdate={(item : ITodo) => UpdateTodoItem(item)}/>
      ))}
      </ul>
    </div>
  );
}

export default App;
