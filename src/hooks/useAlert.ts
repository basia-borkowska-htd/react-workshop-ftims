import { useAlertState } from '../context/AlertContext'

export const useAlert = () => {
	const { alert, setAlert } = useAlertState()

	const showSuccessAlert = (message: string) => {
		setAlert({ message, variant: 'success' })
	}

	const showErrorAlert = (message: string) => {
		setAlert({ message, variant: 'error' })
	}

	const hideAlert = () => {
		setAlert(undefined)
	}

	return { alert, showSuccessAlert, showErrorAlert, hideAlert }
}
