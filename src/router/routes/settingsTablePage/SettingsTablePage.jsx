import React, { useEffect, useState } from 'react'
import { PostService } from '../../../API/PostService'
import Table from '../../../components/Table/Table'
import cl from './SettingsTablePage.module.css'

export default function SettingsTablePage() {
    const [dataGlobal, setDataGlobal] = useState([])
    const [firstDataGlobal, setFirstDataGlobal] = useState([])
    const [data, setData] = useState([['','','','']])
    const [firstData, setFirstData] = useState([])
    const [changeList, setChangeList] = useState({})

    useEffect(() => {
        PostService.getSettingsTable(setDataGlobal, setFirstDataGlobal, setData, setFirstData)
    }, [])

    useEffect(() => {
        console.log(changeList);
    }, [changeList])
    
    const headerDataGlobal = [
        ['Дата сева'],
        ['Пористость'],
        ['ППВ'],
        ['Предппол. В долях ППВ'],
        ['Верхн. порог полива в долях ППВ'],
        ['Нач. влажность в долях ППВ'],
        // ['Дефицит почвенных влагозапасов'],
        ['Культура'],
        ['Метеостанция'],
    ]

    const headerData = [
        [
            'Дата',
            'Температура',
            'Влажность воздуха',
            'Скороcть ветра'
        ]
    ]

    return (
        <div className={cl.settingsTables}>
            <div>
                <button
                onClick={(e) => {
                    PostService.sendSettingsTableChanges(changeList)
                    setChangeList([])
                }}
                >
                    Применить изменения
                </button>
            </div>
            <div className={cl.settingsTables}>
                <Table
                        data={headerDataGlobal}
                        tableStyle={cl.table}
                        rowStyle={cl.row}
                        cellStyle={cl.cellHeader}
                        readOnlyExpression={(isReadOnly) => (isReadOnly)}
                        isReadOnly={true}
                    />
                <Table
                        data={dataGlobal}
                        firstData={firstDataGlobal}
                        tableStyle={cl.table}
                        rowStyle={cl.row}
                        cellStyle={cl.cell}
                        readOnlyExpression={(isReadOnly) => (isReadOnly)}
                        isReadOnly={false}
                        onTableChange={(value, column, row) => {
                            const key = 0 + ',' + column + ',' + row
                            setChangeList({...changeList, [key]: value})
                        }}
                    />
            </div>
            <div>
                <Table
                        data={headerData}
                        tableStyle={cl.table}
                        rowStyle={cl.row}
                        cellStyle={cl.cellHeader}
                        readOnlyExpression={(isReadOnly) => (isReadOnly)}
                        isReadOnly={true}
                    />
                <Table
                        data={data}
                        firstData={firstData}
                        tableStyle={cl.table}
                        rowStyle={cl.row}
                        cellStyle={cl.cell}
                        readOnlyExpression={(isReadOnly, colIndex) => (isReadOnly || colIndex === 0)}
                        isReadOnly={false}
                        onTableChange={(value, column, row) => {
                            const key = 1 + ',' + column + ',' + row
                            setChangeList({...changeList, [key]: value})
                        }}
                    />

            </div>
        </div>
  )
}
