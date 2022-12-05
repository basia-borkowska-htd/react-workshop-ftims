import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { RoutesComponent } from './router/Routes/'
import { AccountStateContextProvider } from './context/AccountContext'

const App = () => (
	<Router>
		<AccountStateContextProvider>
			<RoutesComponent />
		</AccountStateContextProvider>
	</Router>
)

export default App
