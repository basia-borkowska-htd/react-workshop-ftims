import React, { useEffect, useState } from 'react'
import { api } from './api/api'
import './App.css'
import { AccountType } from './types/Account'

export const App = () => {
	const [user, setUser] = useState<AccountType>()
	const [loading, setLoading] = useState(true)

	const logIn = async () => {
		try {
			setLoading(true)
			const { data } = await api.logIn('MichalAdmin', 'P@ssw0rd!')
			setUser(data)
		} catch (error) {
			console.log({ error })
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		logIn()
	}, [])

	return (
		<div className="App">
			{loading && <p>Loading...</p>}
			{!loading && !!user && <p>{JSON.stringify(user)}</p>}
		</div>
	)
}
