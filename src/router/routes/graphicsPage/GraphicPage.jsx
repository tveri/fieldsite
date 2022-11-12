import React, {useState} from 'react';
import { useEffect } from 'react';
import {CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis, LineChart, ComposedChart, Brush, Bar} from "recharts";
import { PostService } from '../../../API/PostService';


const GraphicPage = () => {
    const [data, setData] = useState([])
    const [workData, setWorkData] = useState([])
    const [brushPos, setBrushPos] = useState([0, 999])
    const [opacity, setOpacity] = useState(
        {
            humidityRange: true,
            humidity: true,
            waterIntake: true,
            rain: true,
            watering: true,
        })

    useEffect(() => {
        PostService.getGraphics(setData, setWorkData)
    }, [])

    useEffect(() => {
        setBrushPos([brushPos[0], data.length])
    }, [data])

    useEffect(() => {
        setWorkData(getSlice(brushPos[0], brushPos[1], [...data]))
    }, [brushPos])

    const getSlice = (start, end, array) => {
        return array.splice(start, end)
    }

    return (
        <div>
            <input 
            value={brushPos[0]}
            onChange={(e) => {
                setBrushPos([e.target.value, brushPos[1]])
            }}/>
            <input 
            value={brushPos[1]}
            onChange={(e) => {
                setBrushPos([brushPos[0], e.target.value])
            }}/>
            <ComposedChart
                height={300}
                width={1500}
                data={workData}
                syncId={'graph'}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey='data'/>
                <YAxis />
                <Brush />
                <Tooltip />
                <Legend onClick={(e) => {setOpacity({...opacity, [e.dataKey]: !opacity[e.dataKey]})}}/>
                <Line type="monotone" dataKey="waterIntake" strokeOpacity={opacity.waterIntake ? 1 : 0} stroke="#8884d8" activeDot={{ r: 8 }} />
                <Bar type="monotone" barSize={20} dataKey="rain" opacity={opacity.rain ? 1 : 0} fill="#82ca9d" />
                <Bar type="monotone" barSize={20} dataKey="watering" opacity={opacity.watering ? 1 : 0} fill="#ffca9d" />
            </ComposedChart>
            <ComposedChart
                height={300}
                width={1500}
                data={workData}
                syncId={'graph'}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" orientation={"top"}/>
                <YAxis />
                <Tooltip />
                <Legend onClick={(e) => {setOpacity({...opacity, [e.dataKey]: !opacity[e.dataKey]})}}/>
                <Bar type="monotone" barSize={20} dataKey=" " opacity={0} fill="#ffffff" />
                <Line type="monotone" dataKey="humidityRange" visibility={0} strokeOpacity={opacity.humidityRange ? 1 : 0} stroke="#8884d8" />
                <Line type="monotone" dataKey="humidity" strokeOpacity={opacity.humidity ? 1 : 0} stroke="#82ca9d" />
            </ComposedChart>
        </div>
    );
};

export default GraphicPage;