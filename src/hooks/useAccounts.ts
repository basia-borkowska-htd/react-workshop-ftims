import { api } from '../api/api'
import { useAccountsState } from '../context/AccountsContext'
import { useAlert } from './useAlert'

export const useAccounts = () => {
	const { showErrorAlert } = useAlert()
	const { isFetching, setIsFetching, accounts, setAccounts } = useAccountsState()

	const fetchAccounts = async () => {
		try {
			setIsFetching(true)
			setAccounts(null)
			const { data } = await api.getAccounts()
			setAccounts(data)
		} catch {
			showErrorAlert('Logging in error!')
		} finally {
			setIsFetching(false)
		}
	}

	return { accounts, isFetching, fetchAccounts }
}
