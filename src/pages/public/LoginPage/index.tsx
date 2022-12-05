import { Navigate } from 'react-router-dom'
import { useAccount } from '../../../hooks/useAccount'
import { Pathnames } from '../../../router/pathnames'

export const LoginPageComponent = () => {
	const { isAuthenticated, logIn } = useAccount()

	const handleLogIn = () => {
		logIn('accountA', 'hashmeA')
	}

	if (isAuthenticated) {
		return <Navigate to={Pathnames.user.home} replace />
	}

	return (
		<div>
			This is a login page
			<button onClick={handleLogIn}>Login</button>
		</div>
	)
}
