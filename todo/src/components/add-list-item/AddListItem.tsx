import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './AddListItem.css';
import { ITodo } from '../../interface/ITodo';

interface IPropType {
    onCreate: (item: ITodo) => void;
    id: number;
}

function AddListItem( {onCreate, id} : IPropType) {
    const [mission, setMission] = useState<string>("");

    function addListItem(value: string){
        if(value !== "") {
            return { mission: value, isDone: false, date: getDate(), id: id};
        }
    }
    
    function getDate() : string{
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const today = new Date();
        return `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
    }

    return (
    <div className="add-list-item">
        <FontAwesomeIcon icon={faPlus} className='add-button' onClick={() => {
                if(mission.trimStart().length > 0) {
                    const todo = addListItem(mission);
                    if(todo !== undefined){
                        onCreate(todo);
                        setMission("");
                    }
                }
            }} />
        <input type="text" placeholder='New Item' onChange={(event) => setMission(event.target.value)} value={mission}/>
    </div>
    );
}

export default AddListItem;
