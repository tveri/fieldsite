import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import cl from './Selection.module.css'

export default function Selection({selection, preselected, onSelect}) {
    const [isVisible, setIsVisible] = useState(false)
    const [selected, setSelected] = useState(preselected)
    const [sortedSelection, setSortedSelection] = useState(selection)

    useEffect(() => {
        setSortedSelection(selection)
    }, [selection])

  return (
    <div 
        className={cl.selection}
    >
        {
        !!isVisible
            ?
        (sortedSelection.map((obj) => (
        <div 
            className={sortedSelection.indexOf(obj) === 0 ? cl.selectedElement : cl.selectionElement} 
            key={obj}
            onClick={(e) => {
                onSelect(obj)
                setSelected(obj)
                setIsVisible(false)
            }}
        >
            {obj}
        </div>)))
            :
        <div 
            className={cl.selectedElement}
            onClick={() => {
                sortedSelection[sortedSelection.indexOf(selected)] = sortedSelection[0]
                sortedSelection[0] = selected
                setSortedSelection(sortedSelection)
                setIsVisible(true)
                console.log('click');}}
        >{selected}</div>
        }
    </div>
  )
}
