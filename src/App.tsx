import React, { useEffect, useState } from 'react'
import { api } from './api/api'
import './App.css'
import { GenericAccountType } from './types/Account'
import { BrowserRouter as Router } from 'react-router-dom'
import { RoutesComponent } from './router/Routes/'

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
		<Router>
			<RoutesComponent />
		</Router>
	)
}

export default App
