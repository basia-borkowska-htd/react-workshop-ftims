import { api } from '../api/api'
import { TOKEN } from '../constants'
import { useAccountState } from '../context/AccountContext'
import { AccountTypeEnum } from '../enums/AccountType.enum'

export const useAccount = () => {
	const { account, setAccount, isLoggingIn, setIsLoggingIn, isFetching, setIsFetching } =
		useAccountState()

	const isAuthenticated = !!account?.login
	const isAdmin = account?.accountType === AccountTypeEnum.ADMIN

	const logIn = async (login: string, password: string) => {
		try {
			setIsLoggingIn(true)
			const { data } = await api.logIn(login, password)
			setAccount(data)
		} catch {
			alert('Logging in error!')
		} finally {
			setIsLoggingIn(false)
		}
	}

	const getCurrentAccount = async () => {
		try {
			setIsFetching(true)

			if (localStorage.getItem(TOKEN)) {
				const { data } = await api.getCurrentAccount()
				setAccount(data)
			}
		} catch {
			alert('Unable to get current account!')
		} finally {
			setIsFetching(false)
		}
	}

	return {
		account,
		isLoggingIn,
		isFetching,
		isAuthenticated,
		isAdmin,
		logIn,
		getCurrentAccount,
	}
}
