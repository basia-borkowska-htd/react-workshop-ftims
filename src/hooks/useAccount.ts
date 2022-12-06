import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/api'
import { useAccountState } from '../context/AccountContext'
import { AccountTypeEnum } from '../enums/AccountType.enum'
import { Pathnames } from '../router/pathnames'
import { useAlert } from './useAlert'

export const useAccount = () => {
	const [isLoggingIn, setIsLoggingIn] = useState(false)
	const { account, setAccount } = useAccountState()
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
			const { data } = await api.getCurrentAccount()
			setAccount(data)
		} catch {
			showErrorAlert('Unable to get current account!')
			navigate(Pathnames.public.logout)
		}
	}

	return { isLoggingIn, isAuthenticated, isAdmin, logIn, getCurrentAccount }
}
