import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { PostService } from '../../../API/PostService'
import Table2 from '../../../components/Table2/Table2'
import cl from './TestPage.module.css'

export default function TestPage() {
    const [ data, setData ] = useState([])
    
    useEffect(() => {
        PostService.getTable(setData, setData, '62-05')
        
    }, [])



    return (
        <div>
            {
            !!data
                ?
                <Table2 
                    tableData={data}
                    classNames={cl}
                    tableStyles={cl.table}
                    rowStyles={cl.row}
                    cellStyles={cl.celll}
                    tableFixedXYStyles={cl.tableFixedXY}
                    tableFixedYStyles={cl.tableFixedY}
                    tableFixedXStyles={cl.tableFixedX}
                    tableFlexableStyles={cl.tableFlexable}
                    tableHeaderStyles={cl.tableHeaderStyles}
                    tableFooterStyles={cl.tableFooterStyles}
                    isTableReadOnly={false}
                    writableColumns={[3,5]}
                    readOnlyRows={[0]}
                    columnHoverStyle={cl.columnHover}
                    rowHoverStyle={cl.rowHover}
                    fixedRows={[0,1]}
                    fixedColumns={[0,3]}
                />
                :
                'loading...'
            }
        </div>
    )
}
