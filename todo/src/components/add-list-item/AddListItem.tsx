import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import './AddListItem.css';
import { ITodo } from '../../interface/ITodo';

interface IPropType {
    onCreate: (item: ITodo) => void;
}

function AddListItem( {onCreate} : IPropType) {
    let inp = useRef<HTMLInputElement>(null);

    return (
    <div className="add-list-item">
        <FontAwesomeIcon icon={faPlus} className='add-button' onClick={() => {
                if(inp.current !== null){
                    onCreate(addListItem(inp.current.value!)!);
                    inp.current.value = "";
                }
            }} />
        <input type="text" placeholder='New Item' ref={inp} />
    </div>
    );
}

function addListItem(value: string){
    if(value !== "") {
        let id = findLastKey();
        localStorage.setItem(`${id}`, JSON.stringify({ mission: value, isDone: false, date: getDate(), id: id}));
        return { mission: value, isDone: false, date: getDate(), id: id};
    }
}

function findLastKey() : number {
    let max = 0;
    for (let i = 0; i < localStorage.length; i++) {
        if (parseInt(localStorage.key(i)!) > max) {
            max = parseInt(localStorage.key(i)!);
        }
    }
    return max + 1;
}

function getDate() : string{
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const today = new Date();
    return `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
}

export default AddListItem;
