import './Navigation.css';
import React, { useRef, useState } from 'react';
interface IPropType{
    changeDisplay : (displayType: string) => void;
}

function Navigation( {changeDisplay} : IPropType) {
    const navElement = useRef<HTMLDivElement>(null);
    
    const [indicatorPosition, setIndicatorPosition] = useState<number>();
    
    const handleClick = (event : any) =>{
        const linkLeft = event.target.getBoundingClientRect().left;
        if(navElement.current !== null){
            const navLeft = navElement.current.getBoundingClientRect().left;
            const singleLinkLeft = linkLeft - navLeft;
            setIndicatorPosition(singleLinkLeft);
        }
        changeDisplay(event.target.textContent);
    }

    return (
    <div className="nav" ref={navElement}>
        <div className="indicator" style={{left: indicatorPosition}}></div>
        <div className='nav-item' onClick={handleClick}>All</div>
        <div className='nav-item' onClick={handleClick}>Done</div>
        <div className='nav-item' onClick={handleClick}>Undone</div>
    </div>
    );
}

export default Navigation;
