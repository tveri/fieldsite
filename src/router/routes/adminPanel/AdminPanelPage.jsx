import React, { useState } from 'react'
import { useEffect } from 'react'
import { PostService } from '../../../API/PostService'
import cl from './AdminPanelPage.module.css'

export default function AdminPanelPage({setField, userData}) {
    const [economyName, setEconomyName] = useState('')
    const [economyId, setEconomyId] = useState('')
    const [user, setUser] = useState('')
    const [userColumns, setUserColumns] = useState('')

    useEffect(() => {
        setField('')
    }, [])

    return (
        <div>
            {
            userData.roles.includes('1')
                &&
            <div className={cl.economyAdd}>
                <div>Добавить хозяйство</div>
                <input 
                    type="text" 
                    placeholder='Название хозяйства'
                    value={economyName}
                    onChange={(e) => {
                        setEconomyName(e.target.value)
                    }}
                />
                <input 
                    type="text" 
                    placeholder='Id хозяйства'
                    value={economyId}
                    onChange={(e) => {
                        setEconomyId(e.target.value)
                    }}
                />
                <button
                    onClick={() => {
                        console.log(economyName, economyId);
                        PostService.sendAdminpanelAction({userData, action: {
                            actionName: 'addEconomy',
                            economyName,
                            economyId,
                        }})
                    }}
                >Добавить</button>
            </div>
            }
            {
            userData.roles.includes('2')
                &&
            <div className={cl.userColumns}>
                <input 
                    type="text"
                    placeholder='Логин пользователя'
                    value={user}
                    onChange={(e => {
                        setUser(e.target.value)
                    })}
                />
                <input 
                    type="text"
                    placeholder='Столбцы пользователя через запятую'
                    value={userColumns}
                    onChange={(e => {
                        setUserColumns(e.target.value)
                    })}
                />
                <button
                    onClick={() => {
                        console.log(economyName, economyId);
                        PostService.sendAdminpanelAction({userData, action: {
                            actionName: 'setUserColumns',
                            user,
                            userColumns,
                        }})
                    }}
                >Назначить</button>
            </div>
            }
        </div>
    )
}
