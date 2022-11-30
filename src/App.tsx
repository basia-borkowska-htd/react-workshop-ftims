import React, { useEffect, useState } from 'react'
import { api } from './api/api'
import './App.css'
import { GenericAccountType } from './types/Account'

function App() {
	const [users, setUsers] = useState<GenericAccountType[]>()
	const [loading, setLoading] = useState(true)

	const getAccounts = async () => {
		setLoading(true)
		try {
			const { data } = await api.getAccounts()
			setUsers(data)
		} catch (error) {
			console.log({ error })
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getAccounts()
	}, [])

	return (
		<div className="App">
			{loading && <p>Loading...</p>}
			{!loading && !!users && users.map((user, index) => <p key={index}>{JSON.stringify(user)}</p>)}
		</div>
	)
}

export default App
