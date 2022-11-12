import React from 'react'
import { useState } from 'react'
import { PostService } from '../../../API/PostService'
import cl from './LoginPage.module.css'

export default function LoginPage({setUserData}) {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')

    return (
        <div className={cl.page}>
			<div className={cl.loginForm}>
				<input 
					type="text"
					value={login}
					onChange={(e) => {
						setLogin(e.target.value)
					}}
					placeholder='Mail'
				/>
				<input 
					type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value)
					}}
					placeholder='password'
				/>
				<button
					onClick={(e) => {
						e.preventDefault()
						PostService.login(password, login, setUserData)
					}}
				>
					login
				</button>
			</div>
		</div>
    )
}
