import { useNavigate } from 'react-router'
import { api } from '../api/api'
import { TOKEN } from '../constants'
import { useAccountState } from '../context/AccountContext'
import { AccountTypeEnum } from '../enums/AccountType.enum'
import { Pathnames } from '../router/pathnames'

export const useAccount = () => {
	const navigate = useNavigate()
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

	const logOut = async () => {
		try {
			setIsFetching(true)
			await api.logOut()
		} catch {
			alert('Logout failure!')
		} finally {
			localStorage.removeItem(TOKEN)
			setAccount(null)
			navigate(Pathnames.public.login)
			setIsFetching(false)
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
