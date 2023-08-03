import React, { useState, useEffect } from 'react';
import './App.css';
import ListItem from './components/list-item/ListItem';
import AddListItem from './components/add-list-item/AddListItem';
import Navigation from './components/navigation/Navigation';
let display = "All";

function App() {
  let [todoArray, setTodoArray] = useState<{mission: string, id: number, isDone: boolean, date: string}[]>([]);
  let [displayArray, setDisplayArray] = useState<{mission: string, id: number, isDone: boolean, date: string}[]>([])

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

  const createTodoItem = (item : {mission: string, id: number, isDone: boolean, date: string}) => {
    setTodoArray([...todoArray, item]);
  }

  const UpdateTodoItem = (item : {mission: string, id: number, isDone: boolean, date: string}) => {
    localStorage.setItem(`${item.id}`, JSON.stringify(item));
    let asd = todoArray.map((i) => {
      if(i.id === item.id){
        return item;
      }
      return i;
    });
    setTodoArray(asd);
  }
  
  const displayTypeTodoItem = (displayType : string) => {
    display = displayType;
    console.log(display);
    switch (display){
      case "All":
        setDisplayArray(todoArray);
        break;
      case "Done":
        setDisplayArray(todoArray.filter(function(item){
          if(item.isDone === true){
            return true;
          }
        }));
        break;
        case "Undone":
          setDisplayArray(todoArray.filter(function(item){
            if(item.isDone !== true){
              return true;
            }
          }));
          break;
    }
  }

  return (
    <div className="app">
      <h1>Todo <div>List</div></h1>
      <div className='navigation'>
        <Navigation changeDisplay={(displayType: string) => displayTypeTodoItem(displayType)}/>
      </div>
      <AddListItem onCreate={(item : {mission: string, id: number, isDone: boolean, date: string}) => createTodoItem(item)}/>
      <ul className='todo-list'>
        {
          displayArray.map((item, index) => (
              <ListItem
                todoitem={item} key={item.id}
                onDelete={() => deleteTodoItem(index, item.id)}
                onUpdate={(item : {mission: string, id: number, isDone: boolean, date: string}) => UpdateTodoItem(item)}/>
      ))}
      </ul>
    </div>
  );
}

export default App;
