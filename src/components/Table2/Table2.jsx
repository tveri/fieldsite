import React from 'react'
import { useState, useEffect } from 'react'
import Selection from '../Selection/Selection'

export default function Table2({
    tableStyles, rowStyles, cellStyles, tableFixedXYStyles, tableFixedYStyles, tableFixedXStyles, tableFlexableStyles, tableHeaderStyles, tableFooterStyles, classNames, cellClassName,
    columnHoverStyle, rowHoverStyle,
    tableData,
    fixedRows, fixedColumns,
    isTableReadOnly,
    readOnlyColumns, writableColumns,
    readOnlyRows, writableRows,
    onChange, onCellClick,
    cellChange,
}) {
    const [tableChanges, setTableChanges] = useState({})
    const [table, setTable] = useState({
        fixedXY: {
            data: [],
            startRowIndex: 0,
            startColumnIndex: 0,
            endRowIndex: 0,
            endColumnIndex: 0
        },
        fixedY: {
            data: [],
            startRowIndex: 0,
            startColumnIndex: 0,
            endRowIndex: 0,
            endColumnIndex: 0
        },
        fixedX: {
            data: [],
            startRowIndex: 0,
            startColumnIndex: 0,
            endRowIndex: 0,
            endColumnIndex: 0
        },
        flexable: {
            data: [],
            startRowIndex: 0,
            startColumnIndex: 0,
            endRowIndex: 0,
            endColumnIndex: 0
        }
    })

    useEffect(() => {
        !!onChange && !!tableChanges && onChange(tableChanges) || console.log(tableChanges);
    }, [tableChanges])

    useEffect(() => {
        const fixedRowIndex = !!fixedRows ? Math.max(...fixedRows) : 0
        const fixedColumnIndex = !!fixedColumns ? Math.max(0, ...fixedColumns) : 0
        const rowLenght = !!tableData ? tableData.length : 0
        const columnLenght = !!tableData[0] ? tableData[0].length : 0
        
        setTable({
            fixedXY: {
                tableName: 'fixedXY',
                data: [...tableData].splice(0, fixedRowIndex).map((row) => ([...row].splice(0, fixedColumnIndex))),
                startRowIndex: 0,
                startColumnIndex: 0,
                endRowIndex: fixedRowIndex,
                endColumnIndex: fixedColumnIndex
            },
            fixedY: {
                tableName: 'fixedY',
                data: [...tableData].splice(0, fixedRowIndex).map((row) => ([...row].splice(fixedColumnIndex))),
                startRowIndex: 0,
                startColumnIndex: fixedColumnIndex,
                endRowIndex: fixedRowIndex,
                endColumnIndex: columnLenght
            },
            fixedX: {
                tableName: 'fixedX',
                data: [...tableData].splice(fixedRowIndex).map((row) => ([...row].splice(0, fixedColumnIndex))),
                startRowIndex: fixedRowIndex,
                startColumnIndex: 0,
                endRowIndex: rowLenght,
                endColumnIndex: fixedColumnIndex
            },
            flexable: {
                tableName: 'flexable',
                data: [...tableData].splice(fixedRowIndex).map((row) => ([...row].splice(fixedColumnIndex))),
                startRowIndex: fixedRowIndex,
                startColumnIndex: fixedColumnIndex,
                endRowIndex: rowLenght,
                endColumnIndex: columnLenght
            }
        })

        // console.log(table);
    }, [tableData])

    const renderReadOnlyCell = ({value, tableName, startRowIndex, startColumnIndex, rowIndex, columnIndex, endRowIndex, endColumnIndex, className, cellDataClassName, columnHoverStyle, rowHoverStyle, onClick}) => {
        return (
            <div
                onClick={(e) => {
                    !!onCellClick && onCellClick({
                        value,
                        rowIndex, 
                        columnIndex, 
                        startRowIndex, 
                        startColumnIndex, 
                        tableName, 
                        table
                    })
                }}
                onMouseEnter={
                    () => {
                        if (!!columnHoverStyle) {
                            const column = document.getElementsByClassName(`column${startColumnIndex + columnIndex}`)
                            for (let i = 0; i < column.length; i++) {
                                column[i].classList.toggle(columnHoverStyle);
                                
                            }
                        }
                        if (!!rowHoverStyle) {
                            const column = document.getElementsByClassName(`row${startRowIndex + rowIndex}`)
                            for (let i = 0; i < column.length; i++) {
                                column[i].classList.toggle(rowHoverStyle);
                                
                            }
                        }
                    }
                }
                onMouseLeave={
                    () => {
                        if (!!columnHoverStyle) {
                            const column = document.getElementsByClassName(`column${startColumnIndex + columnIndex}`)
                            for (let i = 0; i < column.length; i++) {
                                column[i].classList.toggle(columnHoverStyle);
                                
                            }
                        }
                        if (!!rowHoverStyle) {
                            const column = document.getElementsByClassName(`row${startRowIndex + rowIndex}`)
                            for (let i = 0; i < column.length; i++) {
                                column[i].classList.toggle(rowHoverStyle);
                                
                            }
                        }
                    }
                }
                className={`
                    ${className} 
                    ${cellDataClassName} 
                    column${startColumnIndex + columnIndex} 
                    row${startRowIndex + rowIndex} 
                    ${!!cellClassName ? cellClassName({value, rowIndex,  columnIndex,  startRowIndex,  startColumnIndex,  tableName,  table}) : ''}
                `} 
                id={`r${startRowIndex + rowIndex}|c${startColumnIndex + columnIndex}|`} 
                key={`r${startRowIndex + rowIndex}|c${startColumnIndex + columnIndex}`}
            >
                {value}
            </div>
        )
    }

    const renderWritableCell = ({value, tableName, startRowIndex, startColumnIndex, rowIndex, columnIndex, endRowIndex, endColumnIndex, className, cellDataClassName, columnHoverStyle, rowHoverStyle, onClick}) => {
        return (
            <div
                className={`${className} ${cellDataClassName} column${startColumnIndex + columnIndex} row${startRowIndex + rowIndex}`} 
                id={`r${startRowIndex + rowIndex}|c${startColumnIndex + columnIndex}`} 
            >
                <input
                    value={value}
                    onChange={(e) => {
                        table[tableName].data[rowIndex][columnIndex].value = e.target.value
                        setTable({...table, [tableName]: table[tableName]})
                        setTableChanges({...tableChanges, [`r${startRowIndex + rowIndex}|c${startColumnIndex + columnIndex}`]: !!cellChange ? cellChange({value: e.target.value, tableName, startRowIndex, startColumnIndex, rowIndex, columnIndex, table}) : e.target.value})
                    }}
                    onClick={onClick}
                    onMouseEnter={
                        () => {
                            if (!!columnHoverStyle) {
                                const column = document.getElementsByClassName(`column${startColumnIndex + columnIndex}`)
                                for (let i = 0; i < column.length; i++) {
                                    column[i].classList.toggle(columnHoverStyle);
                                    
                                }
                            }
                            if (!!rowHoverStyle) {
                                const column = document.getElementsByClassName(`row${startRowIndex + rowIndex}`)
                                for (let i = 0; i < column.length; i++) {
                                    column[i].classList.toggle(rowHoverStyle);
                                    
                                }
                            }
                        }
                    }
                    onMouseLeave={
                        () => {
                            if (!!columnHoverStyle) {
                                const column = document.getElementsByClassName(`column${startColumnIndex + columnIndex}`)
                                for (let i = 0; i < column.length; i++) {
                                    column[i].classList.toggle(columnHoverStyle);
                                    
                                }
                            }
                            if (!!rowHoverStyle) {
                                const column = document.getElementsByClassName(`row${startRowIndex + rowIndex}`)
                                for (let i = 0; i < column.length; i++) {
                                    column[i].classList.toggle(rowHoverStyle);
                                    
                                }
                            }
                        }
                    }
                    // className={``} 
                    id={`r${startRowIndex + rowIndex}|c${startColumnIndex + columnIndex}`} 
                    key={`r${startRowIndex + rowIndex}|c${startColumnIndex + columnIndex}`}
                />
            </div>
        )
    }

    // const renderSelectionCell = ({value, startRowIndex, startColumnIndex, rowIndex, columnIndex, endRowIndex, endColumnIndex, className, cellClassName, columnHoverStyle, rowHoverStyle, onClick}) => {
    //     return (
    //         <div
    //             className={`${className} ${cellClassName} column${startColumnIndex + columnIndex} row${startRowIndex + rowIndex}`} 
    //             onClick={onClick}
    //             onMouseEnter={
    //                 () => {
    //                     if (!!columnHoverStyle) {
    //                         const column = document.getElementsByClassName(`column${startColumnIndex + columnIndex}`)
    //                         for (let i = 0; i < column.length; i++) {
    //                             column[i].classList.toggle(columnHoverStyle);
                                
    //                         }
    //                     }
    //                     if (!!rowHoverStyle) {
    //                         const column = document.getElementsByClassName(`row${startRowIndex + rowIndex}`)
    //                         for (let i = 0; i < column.length; i++) {
    //                             column[i].classList.toggle(rowHoverStyle);
                                
    //                         }
    //                     }
    //                 }
    //             }
    //             onMouseLeave={
    //                 () => {
    //                     if (!!columnHoverStyle) {
    //                         const column = document.getElementsByClassName(`column${startColumnIndex + columnIndex}`)
    //                         for (let i = 0; i < column.length; i++) {
    //                             column[i].classList.toggle(columnHoverStyle);
                                
    //                         }
    //                     }
    //                     if (!!rowHoverStyle) {
    //                         const column = document.getElementsByClassName(`row${startRowIndex + rowIndex}`)
    //                         for (let i = 0; i < column.length; i++) {
    //                             column[i].classList.toggle(rowHoverStyle);
                                
    //                         }
    //                     }
    //                 }
    //             }
    //         >
    //             <Selection
    //                 selection={[value]}
    //                 preselected={value}
    //                 onSelect={(e) => {
    //                     table[tableName].data[rowIndex][columnIndex].value = e.target.value
    //                     setTable({...table, [tableName]: table[tableName]})
    //                     setTableChanges({...tableChanges, [`r${startRowIndex + rowIndex}|c${startColumnIndex + columnIndex}`]: e.target.value})
    //                 }}
                    
    //                 // className={``} 
    //                 id={`r${startRowIndex + rowIndex}|c${startColumnIndex + columnIndex}`} 
    //                 key={`r${startRowIndex + rowIndex}|c${startColumnIndex + columnIndex}`}
    //             />
    //         </div>
    //     )
    // }
    
    const renderCell = ({columnIndex, rowIndex}) => {
        if (isTableReadOnly)
            return renderReadOnlyCell
        
        if (
            (!!readOnlyRows && readOnlyRows.includes(rowIndex))
                || 
            (!!readOnlyColumns && readOnlyColumns.includes(columnIndex))
                ||
            (!!writableColumns && !writableColumns.includes(columnIndex))
                || 
            (!!writableRows && !writableRows.includes(rowIndex))
        ) 
            return renderReadOnlyCell
        
        if (
            (!!writableColumns && writableColumns.includes(columnIndex))
                || 
            (!!writableRows && writableRows.includes(rowIndex))
                ||
            (!!readOnlyColumns && !readOnlyColumns.includes(columnIndex))
                ||
            (!!readOnlyRows && !readOnlyRows.includes(rowIndex))
        )
            return renderWritableCell
        
        console.log('renderReadOnly, not conditions');
        return renderReadOnlyCell
    }

    const renderTable = ({tableName, data, startRowIndex, startColumnIndex, endRowIndex, endColumnIndex}) => (
        <>
            {
                data.map(
                    (tableRow, rowIndex) => {
                        return (
                            <div className={rowStyles} id={`row${rowIndex + startRowIndex}`} key={`row${rowIndex + startRowIndex}`}>
                                {
                                    tableRow.map(
                                        (tableCell, columnIndex) => {
                                            return (
                                                tableCell.value !== undefined && renderCell({
                                                        columnIndex: columnIndex + startColumnIndex,
                                                        rowIndex: rowIndex + startRowIndex
                                                    })(
                                                    {
                                                        ...tableCell,
                                                        tableName: tableName,
                                                        startRowIndex: startRowIndex, 
                                                        startColumnIndex: startColumnIndex,
                                                        rowIndex: rowIndex, 
                                                        columnIndex: columnIndex, 
                                                        endRowIndex: endRowIndex, 
                                                        endColumnIndex: endColumnIndex, 
                                                        className: cellStyles,
                                                        cellDataClassName: !!tableCell.className ? tableCell.className : '',
                                                        columnHoverStyle: columnHoverStyle,
                                                        rowHoverStyle: rowHoverStyle
                                                    }
                                                )
                                            )
                                        }
                                    )
                                }
                            </div>
                        )
                    }
                )
            }
        </>
    )
    

    return (
        <div 
            className={tableStyles} 
        >
            <div className={tableHeaderStyles}>
                <div className={tableFixedXYStyles}>
                    {renderTable(table.fixedXY)}
                </div>
                <div 
                    className={tableFixedYStyles}
                >
                    {renderTable(table.fixedY)}
                </div>
            </div>
            <div className={tableFooterStyles}>
                <div 
                    className={tableFixedXStyles}
                >
                    {renderTable(table.fixedX)}
                </div>
                <div 
                    className={tableFlexableStyles}
                    onScroll={(e) => {
                        document.getElementsByClassName(tableFixedXStyles)[0].scrollTo(0, e.target.scrollTop)
                        document.getElementsByClassName(tableFixedYStyles)[0].scrollTo(e.target.scrollLeft, 0)
                    }}
                >
                    {renderTable(table.flexable)}
                </div>   
            </div>
        </div>
    )
}