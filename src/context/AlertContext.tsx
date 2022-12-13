import { createContext, ReactNode, useContext, useState } from 'react'
import { AlertType } from '../types/Alert'

interface AlertState {
	alert?: AlertType
	setAlert: (item: AlertType | undefined) => void
}

const AlertStateContext = createContext<AlertState | null>(null)

export const AlertStateContextProvider = ({ children }: { children: ReactNode }) => {
	const [alert, setAlert] = useState<AlertType>()

	return (
		<AlertStateContext.Provider value={{ alert, setAlert }}>{children}</AlertStateContext.Provider>
	)
}

export const useAlertState = () => {
	const alertState = useContext(AlertStateContext)

	if (!alertState) {
		throw new Error('You forgot about AlertStateContextProvider!')
	}

	return alertState
}
