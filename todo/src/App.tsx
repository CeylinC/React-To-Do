import React from 'react';
import './App.css';
import ListItem from './components/list-item/ListItem';

const todoList : {mission: string, date: string, isDone: boolean}[] = [
  {
    mission: "Todo1",
    date: "07 Jun 2022",
    isDone: false
  },
  {
    mission: "Todo2",
    date: "07 Jun 2022",
    isDone: true
  },
  {
    mission: "Todo3",
    date: "07 Jun 2022",
    isDone: false
  },
  {
    mission: "Todo4",
    date: "07 Jun 2022",
    isDone: true
  },
];


function App() {
  return (
    <div className="app">
      <h1>Todo List</h1>
      <ul className='todo-list'>
      {
        todoList.map((item, i) => (<ListItem {...item} key={i}></ListItem>))
      }
    </ul>
    </div>
  );
}

export default App;
