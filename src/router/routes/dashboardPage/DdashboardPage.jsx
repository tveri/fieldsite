import React from 'react'
import { useState, useHistory } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { PostService } from '../../../API/PostService';
import Table2 from '../../../components/Table2/Table2';
import cl from './DdashboardPage.module.css';


export default function DdashboardPage({setField, setDate, date, userData}) {
    const [data, setData] = useState({})
    const [header, setHeader] = useState([['']])
    const navigate = useNavigate()

    useEffect(() => {
        PostService.getDashboardTable(setData, setHeader, setDate, userData)
    }, [])

    useEffect(() => {
        !!date && PostService.sendTableChanges({date: date, tableName: 'dashboard', setTableData: setData, userData})
    }, [date])

    return (
        <div className={cl.page}>
            {
            !!data.tables
                ?
                <Table2 
                    tableData={data.tables[0]}
                    classNames={cl}
                    tableStyles={cl.table}
                    rowStyles={cl.row}
                    cellStyles={cl.cell}
                    tableFixedXYStyles={cl.tableFixedXY}
                    tableFixedYStyles={cl.tableFixedY}
                    tableFixedXStyles={cl.tableFixedX}
                    tableFlexableStyles={cl.tableFlexable}
                    tableHeaderStyles={cl.tableHeaderStyles}
                    tableFooterStyles={cl.tableFooterStyles}
                    isTableReadOnly={Math.min(userData.roles) === 4 ? true : false}
                    readOnlyColumns={[0,1,2,3,4,5,6,7,8]}
                    readOnlyRows={[0,1,2]}
                    columnHoverStyle={cl.columnHover}
                    rowHoverStyle={cl.rowHover}
                    fixedRows={[0,3]}
                    fixedColumns={[0,9]}
                    cellChange={({value, tableName, startRowIndex, startColumnIndex, rowIndex, columnIndex, table}) => {
                        return ({
                            date: table.fixedY.data[2][columnIndex].value,
                            field: table.fixedX.data[rowIndex][1].value,
                            value
                        })
                    }}
                    onChange={(changes) => {
                        !!changes && PostService.sendTableChanges({changes: changes, date: date, tableName: 'dashboard', setTableData: setData, userData})
                    }}
                    onCellClick={({value, rowIndex, columnIndex, startRowIndex, startColumnIndex, tableName, table}) => {
                        if (columnIndex + startColumnIndex === 1 && rowIndex + startRowIndex > 2 && !!value) {
                            console.log(value);
                            setField(value)
                            navigate(`/graphic/${value}`)
                        }
                    }}
                    cellClassName={({value, rowIndex, columnIndex, startRowIndex, startColumnIndex, tableName, table}) => {
                        if (columnIndex + startColumnIndex === 1 && rowIndex + startRowIndex > 2) {
                            return (cl.clickableCell)
                        }
                    }}
                />
                :
                'loading...'
            }
        </div>
  )
}
