import React, {useState} from 'react';
import {PostService} from "../../API/PostService";
import { useEffect } from 'react';
import {cloneDeep} from 'lodash';
import { Link } from 'react-router-dom';
import Select from 'react-select'

const Table = ({data, cellStyle, firstData, rowStyle, tableStyle, setData, isReadOnly, setField, readOnlyExpression, selectionExpression, selections, onTableChange, isDashboard, cl, field}) => {
    const [tableData, setTableData] = useState([[0]])

    useEffect(() => {
        // console.log(tableData);
        setTableData(firstData)
    }, [firstData])

    const getValue = (x, y) => {
        if (tableData[x] === undefined) {
            return data[x][y]
        } else {
            return tableData[x][y]
        }
    }

    return (
        <div className={tableStyle}>
            {data.map(((row, index) => {
                let rowIndex = index
                return(
                <div className={rowStyle} key={rowIndex}>
                    {
                        row.map((cell, index) => {
                            let colIndex = index
                            let selectionIndex = 0
                            if (colIndex === 6) {
                                selectionIndex += 1
                            }
                            // console.log(tableData)
                            return (
                                    <div className={cellStyle} key={rowIndex + '|' + colIndex}>
                                        {readOnlyExpression(isReadOnly, colIndex)
                                            ?
                                        (isDashboard && colIndex === 1) ? <Link onClick={() => {setField(cell)}} className={cl.link} to={'/graphic/' + cell}>{cell}</Link> : cell
                                            :                                        
                                        !!selectionExpression && selectionExpression(colIndex) 
                                            ? 
                                        <Select 
                                        defaultValue={{value: cell, label: cell}}    
                                        options={selections[selectionIndex].map((selection) => ({value: selection, label: selection}))}
                                        onChange={(e) => {
                                            onTableChange(e.value, 7-selectionIndex, 0);
                                        }}
                                        />
                                            :
                                        <input
                                            value={getValue(rowIndex,colIndex)}
                                            id={colIndex + ',' + rowIndex}
                                            onChange={(e) => {
                                                let tempData = cloneDeep(tableData)
                                                tempData[e.target.id.split(',')[1]][e.target.id.split(',')[0]] = e.target.value
                                                setTableData(tempData)
                                                
                                                console.log(e.target.value);
                                                
                                                !!onTableChange 
                                                    ?
                                                    onTableChange(e.target.value, e.target.id.split(',')[0], e.target.id.split(',')[1])
                                                    :
                                                    PostService.sendTableChange(
                                                            setData,
                                                            {
                                                            value: e.target.value,
                                                            column: e.target.id.split(',')[0],
                                                            row: e.target.id.split(',')[1]
                                                            },
                                                            field
                                                        )
                                                    


                                            }}
                                        />
                                        }
                                    </div>
                                )
                            }
                        )
                    }
                </div>)
            }))}
        </div>
    );
};

export default Table;