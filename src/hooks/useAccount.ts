import { api } from '../api/api'
import { useAccountState } from '../context/AccountContext'
import { AccountTypeEnum } from '../enums/AccountType.enum'

export const useAccount = () => {
	const { account, setAccount } = useAccountState()

	const isAuthenticated = !!account?.login
	const isAdmin = account?.accountType === AccountTypeEnum.ADMIN

	const logIn = async (login: string, password: string) => {
		try {
			const { data } = await api.logIn(login, password)
			setAccount(data)
		} catch {
			alert('Logging in error!')
		}
	}

	const getCurrentAccount = async () => {
		try {
			const { data } = await api.getCurrentAccount()
			setAccount(data)
		} catch {
			alert('Unable to get current account!')
		}
	}

	return { isAuthenticated, isAdmin, logIn, getCurrentAccount }
}
