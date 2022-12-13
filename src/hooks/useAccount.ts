import { useNavigate } from 'react-router'
import { api } from '../api/api'
import { TOKEN } from '../constants'
import { useAccountState } from '../context/AccountContext'
import { AccountTypeEnum } from '../enums/AccountType.enum'
import { Pathnames } from '../router/pathnames'
import { useAlert } from './useAlert'

export const useAccount = () => {
	const navigate = useNavigate()
	const { account, setAccount, isLoggingIn, setIsLoggingIn, isFetching, setIsFetching } =
		useAccountState()
	const { showErrorAlert } = useAlert()

	const isAuthenticated = !!account?.login
	const isAdmin = account?.accountType === AccountTypeEnum.ADMIN

	const logOut = async () => {
		try {
			setIsFetching(true)
			await api.logOut()
		} catch {
			showErrorAlert('Logout failure!')
		} finally {
			localStorage.removeItem(TOKEN)
			setAccount(null)
			navigate(Pathnames.public.login)
			setIsFetching(false)
		}
	}

	const logIn = async (login: string, password: string) => {
		try {
			setIsLoggingIn(true)
			const { data } = await api.logIn(login, password)
			setAccount(data)
		} catch {
			showErrorAlert('Logging in error!')
			logOut()
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
			showErrorAlert('Unable to get current account!')
			logOut()
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
		logOut,
	}
}
