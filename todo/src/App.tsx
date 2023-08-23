import React, { useState, useEffect } from 'react';
import './App.css';
import ListItem from './components/list-item/ListItem';
import AddListItem from './components/add-list-item/AddListItem';
import Navigation from './components/navigation/Navigation';
import { ITodo } from './interface/ITodo';

function App() {
  const [todoArray, setTodoArray] = useState<ITodo[]>([]);
  const [displayType, setDisplayType] = useState<string>("All");

  useEffect(() => {
    const lsTodo = localStorage.getItem("todoList");
    if(lsTodo !== null)
        setTodoArray(JSON.parse(lsTodo));
	}, []);

  useEffect(() => {
    todoArray.sort((a, b) => { return b.id - a.id; });
    console.log("useEffect çalıştı");
    localStorage.setItem("todoList", JSON.stringify(todoArray));
  }, [todoArray]);

  const deleteTodoItem = (index: number) => {
    setTodoArray((prev) => {
      const updateArray = [...prev];
      updateArray.splice(index, 1);
      return updateArray;
    });
  }

  function findLastKey() : number {
    let max = 0;
    todoArray.forEach((todo) => {
      if(todo.id > max){
        max = todo.id;
      }
    })
    return max + 1;
}

  const createTodoItem = (item : ITodo) => {
    setTodoArray([...todoArray, item]);
  }

  const UpdateTodoItem = (item : ITodo) => {
    let tempArray = todoArray.map((i) => {
      if(i.id === item.id){
        return item;
      }
      return i;
    });
    setTodoArray(tempArray);
  }

  return (
    <div className="app">
      <h1>Todo <div>List</div></h1>
      <div className='navigation'>
        <Navigation changeDisplay={(value: string) => setDisplayType(value)}/>
      </div>
      <AddListItem onCreate={(item : ITodo) => createTodoItem(item)} id={findLastKey()} />
      <ul className='todo-list'>
        {
          todoArray.filter((todo) => {
            switch(displayType){
              case "All":
                return true;
              case "Undone":
                return !todo.isDone;
              case "Done":
                return todo.isDone;
              default:
                return false;
            }
          }).map((todo, index) => (
            <ListItem
                todoitem={todo} key={todo.id}
                onDelete={() => deleteTodoItem(index)}
                onUpdate={(todo : ITodo) => UpdateTodoItem(todo)}/>
          ))
      }
      </ul>
    </div>
  );
}

export default App;
