import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { RoutesComponent } from './router/Routes/'

export const App = () => (
	<Router>
		<RoutesComponent />
	</Router>
)
