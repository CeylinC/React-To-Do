import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import './AddListItem.css';

function AddListItem() {
    let inp = useRef<HTMLInputElement>(null);

    return (
    <div className="add-list-item">
        <FontAwesomeIcon icon={faPlus} className='add-button' onClick={() => addListItem(inp.current?.value)} />
        <input type="text" placeholder='New Item' ref={inp} />
    </div>
    );
}

function addListItem(value: string | undefined){
    if(value !== "") {
        localStorage.setItem(findLastKey(), JSON.stringify({ mission: value, isDone: false, date: getDate()}));
    }
}

function findLastKey() : string {
    let max = 0;
    for (let i = 0; i < localStorage.length; i++) {
        if (parseInt(localStorage.key(i)!) > max) {
            max = parseInt(localStorage.key(i)!);
        }
    }
    console.log(max);
    return `${max + 1}`;
}

function getDate() : string{
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const today = new Date();
    return `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
}

export default AddListItem;
