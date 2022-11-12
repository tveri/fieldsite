import React from 'react';
import cl from './ModalWindow.module.css';

export default function ModalWindow({children, isVisible, setIsVisible}) {
    

    return (
        <div 
        id='closeOnClick' 
        className={!isVisible ?  cl.modalWindowHidden : cl.modalWindow}
        onClick={(e) => {
            setIsVisible(e.target.id !== 'closeOnClick')
        }}
        >
            <div className={!isVisible ? cl.modalWindowContentHidden : cl.modalWindowContent}>
                {children}
            </div>
        </div>
  )
}

