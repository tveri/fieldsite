import React, { useEffect, useState, useRef } from 'react'
import { useLoadScript, GoogleMap, Polygon, Marker } from "@react-google-maps/api";
import { PostService } from '../../../API/PostService'
import { useNavigate } from 'react-router-dom'
import cl from './MapPage.module.css'


export default function MapPage({setField, userData}) {
    const navigate = useNavigate()
    const {ref} = useRef(null)
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyDuEVfCVtpYkToys671Y8HyHdSeLpL4W_8"
    })
    const [mapData, setMapData] = useState({})
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [isFieldDataLoaded, setIsFieldDataLoaded] = useState(false)
    const [mapFields, setMapFields] = useState({
        'totalFC': 0,
        'settings': {
            'zoom': 10,
            'center': {
                'lat': 51.46471, 
                'lng': 36.7572480
            }
        },
        'data': [
            {
            'field': '',
            'coordinates': [],
            'center': {
                'lat': 0, 
                'lng': 0
            },
            'isAvalible': false,
            'color': '#000000'
        }
        ]
    })

    useEffect(() => {
        PostService.getMapFields(setMapFields, setIsFieldDataLoaded, userData)
        PostService.getMapData(setMapData, setIsDataLoaded, userData)
    }, [])
    
    return (
        <div className={cl.mapPage}>
            {
                isDataLoaded
                    ?
                <div className={cl.infoPanel}>
                    <div className={cl.areaContainer}>
                        <div 
                            className={cl.economyName}
                            onClick={(e) => {
                                setMapFields({...mapFields, 'settings': {zoom: 10, center: {lat: 51.46471, lng: 37.23724}}})
                            }}
                        >{userData.userEconomyName}</div>
                    </div>
                    {
                        mapData.infoPanelData.areas.map((areaData, i) => {
                            return (
                                <div className={cl.areaContainer} key={i}>
                                    <div className={cl.areaHeaderContainer}>
                                        <div 
                                            className={cl.areaName}
                                            onClick={(e) => {
                                                setMapFields({...mapFields, 'settings': areaData.areaCoordinates})
                                            }}
                                        >{areaData.areaName}</div>
                                        
                                        <div className={cl.areaCountsContainer}>
                                            <div className={cl.areaCounts}>
                                                <div className={cl.areaCountsName}>Полей:</div>
                                                <div className={cl.areaCount}>{areaData.fieldsCount}</div>
                                            </div>
                                            <div className={cl.areaCounts}>
                                                <div className={cl.areaCountsName}>Площадь:</div>
                                                <div className={cl.areaCount}>{areaData.fieldsArea}Га</div>
                                            </div>
                                            <div className={cl.areaCounts}>
                                                <div className={cl.areaCountsName}>ППВ:</div>
                                                <div className={cl.areaCount}>{areaData.totalFC}%</div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className={cl.areaContentContainer}>
                                            {areaData.cultures.map((cultureData, ii) => {
                                                return (
                                                    <div className={cl.areasInfoContainer}>
                                                        <div className={cl.areaCounts}>
                                                            <div className={cl.areasInfoCulture}>{cultureData.culture}</div>
                                                        </div>
                                                        <div className={cl.areaCounts}>
                                                            <div className={cl.areasInfoCultureArea}>{cultureData.area}Га</div>
                                                        </div>
                                                    </div>
                                            )})}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                    :
                "loading..."
            }

            {isLoaded && isFieldDataLoaded
                ?
            <div className={cl.mapWrapper}>
                <GoogleMap
                    id="map"
                    ref={ref}
                    zoom={mapFields.settings.zoom}
                    center={mapFields.settings.center}
                    mapContainerClassName={cl.map}
                    width={500}
                    height={500}
                >
                {mapFields.data.meteostations.map((meteostation, i) => (
                    <Marker
                    key={i}
                    title={meteostation.name}
                    label={meteostation.name}
                    position={meteostation.center}
                    opacity={1}
                    icon={'https://maps.google.com/mapfiles/kml/shapes/donut.png'}
                />
                ))}
                {mapFields.data.fields.map((mapField) => {
                    return (
                        <>
                            <Polygon
                                options={{
                                    strokeColor: mapField.color,
                                    strokeOpacity: 0.8,
                                    strokeWeight: 3,
                                    fillColor: mapField.color,
                                    fillOpacity: 0.5
                                }}
                                key={mapField.field}
                                paths={mapField.coordinates}
                                onClick={(e) => {
                                    if (mapField.isAvalible) {
                                    setField(mapField.field)
                                    navigate('/graphic/' + mapField.field)
                                }}}
                            />

                            <Marker
                                title={mapField.field}
                                label={`${mapField.field} ${mapField.fc}% ${mapField.watering}мм ${mapField.mm}мм ${mapField.culture}`}
                                position={mapField.center}
                                opacity={1}
                                icon={'https://digital-order.ru/api/mapicon'}
                                onClick={(e) => {
                                    if (mapField.isAvalible) {
                                    setField(mapField.field)
                                    navigate('/graphic/' + mapField.field)
                                }}}
                            />

                        </>
                    )
                })}
                

                </GoogleMap>
                
            </div>
                :
            'loading...'
            }
        </div>
    );
  
}
