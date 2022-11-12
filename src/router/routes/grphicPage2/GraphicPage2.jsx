import React, {useState} from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis, LineChart, ComposedChart, Brush, Bar} from "recharts";
import { PostService } from '../../../API/PostService';
import Table from '../../../components/Table/Table';
import cl from './GraphicPage.module.css'
import Select from 'react-select'


const GraphicPage = ({userData, field}) => {
    // const field = document.location.pathname.split('/')[2]
    const glassNames = [5, 20, 40, 60, 75, 85, 100]
    const [glassName, setGlassName] = useState(glassNames[0])
    const [changes, setChanges] = useState({})
    const [data, setData] = useState([])
    const [workData, setWorkData] = useState([])
    const [globalData, setGlobalData] = useState([['','','','','','','','']])
    const [globalData1, setGlobalData1] = useState([['']])
    const [globalData2, setGlobalData2] = useState([['']])
    const [inputVal, setInputVal] = useState('')
    const [selections, setSelections] = useState({cultures: {value: '', list: ['']}, meteostations: {value: '', list: ['']}})
    const [interval, setIntraval] = useState(0)
    const [opacity, setOpacity] = useState(
        {
            humidityRange: true,
            humidity: true,
            waterIntake: true,
            rain: true,
            watering: true,
            stressLine: true,
        })

    const headerDataGlobal1 = [[
        'Дата сева',
    ]]

    const headerDataGlobal2 = [
        ['Площадь'],
        ['Культура'],
        ['Метеостанция']
    ]

    const headerDataGlobal3 = [
        ['Пористость'],
        ['ППВ'],
        ['Предппол. В долях ППВ'],
        ['Верхн. порог полива в долях ППВ'],
        ['Нач. влажность в долях ППВ'],
    ]

    useEffect(() => {
        PostService.getGraphics(setData, setWorkData, field, userData)
        PostService.getGlobalData(setGlobalData, setGlobalData1, setGlobalData2, setSelections, field, userData)
    }, [])

    useEffect(() => {
        console.log(changes);
    }, [changes])

    const getName = () => {
        if (data.fc >= 85) {
            return (6)
        } else if (workData.fc >= 75) {
            return (5)
        } else if (workData.fc >= 60) {
            return (4)
        } else if (workData.fc >= 40) {
            return (3)
        } else if (workData.fc >= 20) {
            return (2)
        } else if (workData.fc >= 10) {
            return (1)
        } else {
            return (0)
        }
    }

    useEffect(() => {
        setGlassName(glassNames[getName()])
    }, [workData.fc])

    return (
        <div className='page'>
            <div className={cl.graph}>
                <ComposedChart
                    height={500}
                    width={1580}
                    data={workData.data}
                    syncId={'graph'}

                >
                    <CartesianGrid />
                    <XAxis dataKey='data'/>
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Brush />
                    <Tooltip />
                    <Legend 
                        cursor={'pointer'} 
                        onClick={(e) => {
                            setOpacity({...opacity, [e.dataKey]: !opacity[e.dataKey]})}
                            }
                    />
                    <Line 
                        name='Водопотребление' 
                        yAxisId="left" 
                        type="monotone" 
                        dataKey="waterIntake" 
                        visibility={opacity.waterIntake ? 'visible' : 'hidden'} 
                        stroke="#a54974" 
                        // activeDot={{ r: 8 }}
                        />
                    <Line 
                        name='Оптимум зона (75%>)' 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="humidityRange" 
                        visibility={opacity.humidityRange ? 'visible' : 'hidden'} 
                        stroke="#66cdaa" 
                        dot={0}
                    />
                    <Line 
                        name='Актуальная влажность' 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="humidity" 
                        visibility={opacity.humidity ? 'visible' : 'hidden'} 
                        stroke="#7a49a5" 
                    />
                    <Line 
                        name='Линия стресса' 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="stressLine" 
                        visibility={opacity.stressLine ? 'visible' : 'hidden'} 
                        stroke="#f00" 
                        dot={0}
                    />
                    <Bar 
                        name='Атмосферные осадки Р, мм' 
                        yAxisId="left" 
                        type="monotone" 
                        barSize={20} 
                        dataKey="rain" 
                        visibility={opacity.rain ? 'visible' : 'hidden'} 
                        fill="#1a4f76" 
                    />
                    <Bar 
                        name='Реализованный полив mф , мм' 
                        yAxisId="left" 
                        type="monotone" 
                        barSize={20} 
                        dataKey="watering" 
                        visibility={opacity.watering ? 'visible' : 'hidden'} 
                        fill="#a3b8c8" />
                </ComposedChart>
            </div>
            <div className={cl.tableWrapper}>
                <div className={cl.left}>
                    <div className={cl.row}>
                        <Table
                            data={headerDataGlobal1}
                            tableStyle={cl.table}
                            rowStyle={cl.row}
                            cellStyle={cl.cellHeader}
                            readOnlyExpression={(isReadOnly) => (isReadOnly)}
                            isReadOnly={true}
                        />
                        <Table
                            data={globalData1}
                            firstData={globalData1}
                            tableStyle={cl.table}
                            rowStyle={cl.row}
                            cellStyle={cl.cellHeader}
                            readOnlyExpression={(isReadOnly) => (isReadOnly)}
                            isReadOnly={Math.min(userData.roles) === 4 ? true : false}
                            onTableChange={(val, col, row) => {
                                setChanges({...changes, [col + ',' + row]: val})
                            }}
                        />
                    </div>
                    <div className={cl.row}>
                        <div className={cl.table}>
                            <div className={cl.row}>
                                <div className={cl.cell}>Площадь</div>
                                <div className={cl.cell}>
                                    {Math.min(userData.roles) === 4 
                                        ?
                                    <div>{globalData[0][8]}</div> 
                                        :
                                    <input 
                                    value={globalData[0][8]}
                                    onChange={(e) => {
                                        globalData[0][8] = e.target.value
                                        setGlobalData(globalData)
                                        setChanges({...changes, [8 + ',' + 0]: e.target.value})
                                    }}
                                    />
                                    }
                                </div>
                            </div>
                            <div className={cl.row}>
                                <div className={cl.cell}>Культура</div>
                                <div className={cl.cell}>
                                    {Math.min(userData.roles) === 4
                                        ?
                                    <div>{selections.cultures.value.value}</div>
                                        :
                                    !!selections.cultures.value 
                                        ?
                                    <Select 
                                        className={cl.selection}
                                        defaultValue={selections.cultures.value}    
                                        options={selections.cultures.list}
                                        onChange={(e) => {
                                            setChanges({...changes, [6 + ',' + 0]: e.value})
                                        }}
                                        />
                                        :
                                    'loading...'
                                        }
                                </div>
                            </div>
                            <div className={cl.row}>
                                <div className={cl.cell}>Метеостанция</div>
                                <div className={cl.cell}>
                                {Math.min(userData.roles) === 4
                                    ?
                                <div>{selections.meteostations.value.value}</div>
                                    :
                                !!selections.cultures.value 
                                        ?
                                    <Select 
                                    className={cl.selection}
                                        defaultValue={selections.meteostations.value}    
                                        options={selections.meteostations.list}
                                        onChange={(e) => {
                                            setChanges({...changes, [7 + ',' + 0]: e.value})
                                        }}
                                        />
                                        :
                                    'loading...'
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cl.buttonWraper}>
                        {Math.min(userData.roles) === 4
                            ?
                        <div></div>
                            :
                        <button
                        onClick={() => {
                            PostService.sendGlobalDataChange(changes, field, userData)
                        }}
                        >Сохранить изменения</button>
                        }
                    </div>
                </div>
                <div className={cl.right}>
                    <img className={cl.glassofwater} src={process.env.PUBLIC_URL + `/glass${glassName}.png`} alt="" />
                </div>
                {/* <div className={cl.right}>
                    <div className={cl.row}>
                        <Table
                            data={headerDataGlobal3}
                            tableStyle={cl.table}
                            rowStyle={cl.row}
                            cellStyle={cl.cellHeader}
                            readOnlyExpression={(isReadOnly) => (isReadOnly)}
                            isReadOnly={true}
                        />
                        <Table
                            data={globalData2}
                            firstData={globalData2}
                            tableStyle={cl.table}
                            rowStyle={cl.row}
                            cellStyle={cl.cellHeader}
                            readOnlyExpression={(isReadOnly) => (isReadOnly)}
                            isReadOnly={Math.min(userData.roles) === 4 ? true : false}
                            onTableChange={(val, col, row) => {
                                console.log(val, col, row);
                                setChanges({...changes, [(Number(row) + 1) + ',' + col]: val})
                            }}
                        />
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default GraphicPage;