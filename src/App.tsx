import React, { useEffect, useState } from 'react'
import { api } from './api/api'
import './App.css'
import { GenericUserType } from './types/Account'

function App() {
	const [users, setUsers] = useState<GenericUserType[]>()
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
	// useEffect(() => {
	// 	fetch('http://localhost:8080/test/api/accounts', {
	// 		method: 'GET',
	// 		mode: 'no-cors',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 	})
	// 		.then((res) => res.json())
	// 		.then(
	// 			(result) => {
	// 				setLoading(true)
	// 				setData(result)
	// 			},
	// 			(error) => {
	// 				setLoading(true)
	// 				setError(error)
	// 			},
	// 		)
	// }, [])
	return (
		<div className="App">
			{loading && <p>Loading...</p>}
			{!loading && !!users && users.map((user, index) => <p key={index}>{JSON.stringify(user)}</p>)}
		</div>
	)
}

export default App
