import { api } from '../api/api'
import { useAccountDetailsState } from '../context/AccountDetailsContext'
import { useAlert } from './useAlert'

export const useAccountDetails = () => {
	const { showErrorAlert } = useAlert()
	const { isFetching, setIsFetching, account, setAccount } = useAccountDetailsState()

	const getAccountDetails = async (login: string) => {
		try {
			if (isFetching) return
			setIsFetching(true)
			const { data } = await api.getAccount(login)
			setAccount(data)
		} catch {
			showErrorAlert('Unable to find account')
		} finally {
			setIsFetching(false)
		}
	}

	return { account, isFetching, getAccountDetails }
}
