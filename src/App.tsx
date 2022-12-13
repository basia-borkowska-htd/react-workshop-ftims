import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { RoutesComponent } from './router/Routes/'
import { AccountStateContextProvider } from './context/AccountContext'
import { Snackbar } from '@mui/material'
import { AlertStateContextProvider } from './context/AlertContext'
import { useAlert } from './hooks/useAlert'
import { AccountsStateContextProvider } from './context/AccountsContext'

const AlertListener = () => {
	const { alert, hideAlert } = useAlert()

	return (
		<Snackbar open={!!alert} autoHideDuration={6000} onClose={hideAlert} message={alert?.message} />
	)
}

export const App = () => (
	<Router>
		<AlertStateContextProvider>
			<AccountStateContextProvider>
				<AccountsStateContextProvider>
					<AlertListener />
					<RoutesComponent />
				</AccountsStateContextProvider>
			</AccountStateContextProvider>
		</AlertStateContextProvider>
	</Router>
)
