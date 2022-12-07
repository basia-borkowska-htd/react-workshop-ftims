import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'
import { TOKEN } from '../constants'
import { useAccountState } from '../context/AccountContext'
import { AccountTypeEnum } from '../enums/AccountType.enum'
import { Pathnames } from '../router/pathnames'
import { useAlert } from './useAlert'

export const useAccount = () => {
	const { account, setAccount, isLoggingIn, setIsLoggingIn, isFetching, setIsFetching } =
		useAccountState()
	const { showErrorAlert } = useAlert()
	const navigate = useNavigate()

	const isAuthenticated = !!account?.login
	const isAdmin = account?.accountType === AccountTypeEnum.ADMIN

	const logIn = async (login: string, password: string) => {
		try {
			setIsLoggingIn(true)
			const { data } = await api.logIn(login, password)
			setAccount(data)
		} catch {
			showErrorAlert('Logging in error!')
			navigate(Pathnames.public.logout)
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
		} finally {
			setIsFetching(false)
		}
	}

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
