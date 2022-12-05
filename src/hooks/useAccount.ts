import { useState } from 'react'

export const useAccount = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)

	return { isAuthenticated, isAdmin }
}
