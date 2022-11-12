import React, {useState, useEffect} from 'react';
import cl from './TableFinalPage.module.css';
import {PostService} from "../../../API/PostService";
// import Table from "../../../components/Table/Table";
// import ModalWindow from '../../../components/modalWindow/ModalWindow';
// import { Link } from 'react-router-dom';
import Table2 from '../../../components/Table2/Table2';

const TableFinalPage = ({userData}) => {
    const field = document.location.pathname.split('/')[2]
    const [isModalWindowVisible, setIsModalWindowVisible] = useState(false)
    const [data, setData] = useState('')
    const [firstData, setFirstData] = useState([[]])
    const firstLine = [['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC']]

    const header = [[
        '№ п/п',
        'Дата',
        'день от даты сева',
        'температура воздуха t, °С',
        'влажность воздуха А, %',
        'скорость ветра V2 на высоте 2м, м/с',
        'испаряемость Ei, мм/сут',
        'средне многолетняя суточная испаряемость Ео, мм/сут',
        'Сумма температур воздуха с даты сева ∑t, °С',
        'средне многолетний Кбо',
        'текущий Кбi',
        'Водопотреб ление Ev, мм/сут ',
        'Расчетный слой почвы h, м',
        'Влагоемкость расчетного слоя почвы слоя почвы Wнв, мм',
        'Предполивные влагозапасы расчетного слоя слоя почвы Wпр, мм',
        'Макс. возможная поливная норма m, мм',
        'Весенние влагозапасы на 01.05 Wв=0,9Wнв,мм ',
        'Приращение Wв',
        'Начальные влагозапасы Wн, мм',
        '(Wнв-Wн)+Ev',
        'Атмосферные осадки Р, мм',
        'Реализованный полив mф , мм',
        'Эффективное поступление влаги Нэф, мм',
        'Конечные влагозапасы в расчетном слое почвы Wк,мм ',
        'Расчетный полив mр, мм',
        'Конечные влагозапасы в расчетном слое почвы после полива, мм',
        'сколько мм влаги не хватает до верхнего порога (0,95 ППВ)?',
        'Диапазон, мм',
        'Влагозапасы факт, мм'
    ]]

    useEffect(() => {
        PostService.getTable(setData, setFirstData, field, userData)
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()

        PostService.sendFilledTemplate(data, setData, setFirstData, setIsModalWindowVisible)
    }

    return (
        <div className={cl.page}>
            {/* <ModalWindow isVisible={isModalWindowVisible} setIsVisible={setIsModalWindowVisible}> 
                <div className='uploadModalWindow'>
                    <form onSubmit={submitHandler}>
                        <input 
                            type="file" 
                            onChange={(e) => {
                                setData(e.target.files)}}
                        />
                        <input type="submit" />
                    </form>
                </div>
            </ModalWindow>
            <div className={cl.buttonsContainer}>
                <div className={cl.buttonWraper}>
                    <a href={"https://digital-order.ru/api/gettemplate?field=" + "62-05"} download rel="noreferrer" target="_blank">
                        <img src="https://cdn-icons-png.flaticon.com/512/3031/3031707.png" alt="" />
                    </a>
                </div>
                <div className={cl.buttonWraper}>
                    <button onClick={(e) => {
                        setIsModalWindowVisible(true)
                    }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/3031/3031708.png" alt="" />
                    </button>
                </div>
                <div className={cl.buttonWraper}>
                    <Link to='/settingspage/'>
                        <img src="https://cdn-icons-png.flaticon.com/512/3524/3524659.png" alt="" />
                    </Link>
                </div>
            </div> */}
            {
            !!data
                ?
                <Table2 
                    tableData={data}
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
                    writableColumns={!userData.roles.includes('3') ? [10, 20, 21, ] : userData.writableColumns}
                    readOnlyRows={[0]}
                    columnHoverStyle={cl.columnHover}
                    rowHoverStyle={cl.rowHover}
                    fixedRows={[0,1]}
                    fixedColumns={[0,2]}
                    onChange={(changes) => {
                        !!changes && PostService.sendTableChanges({changes: changes, tableName: `field|${field}`, setTableData: setData, userData})
                    }}
                />
                :
                'loading...'
            }
        </div>
    );
};

export default TableFinalPage;