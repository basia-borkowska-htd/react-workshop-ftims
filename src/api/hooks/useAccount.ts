import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccountState } from '../../context/AccountContext'
import { AccountTypeEnum } from '../../enums/AccountType.enum'
import { Pathnames } from '../../router/pathnames'
import { api } from '../api'

export const useAccount = () => {
	const navigate = useNavigate()
	const { account, setAccount, setIsFetching, isFetching, isLoggingIn, setIsLoggingIn } =
		useAccountState()

	const isAuthenticated = !!account?.login
	const isAdmin = account?.accountType === AccountTypeEnum.ADMIN

	const logOut = async () => {
		try {
			setIsFetching(true)
			await api.logOut()
		} catch {
			console.log('Logout failure')
		} finally {
			localStorage.removeItem('token')
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
			console.log('Logging in failure')
			logOut()
		} finally {
			setIsLoggingIn(false)
		}
	}
	const getCurrentAccount = async () => {
		try {
			setIsFetching(true)
			if (localStorage.getItem('token')) {
				const { data } = await api.getCurrentAccount()
				setAccount(data)
			}
		} catch {
			console.log('Unable to get current account')
			logOut()
		} finally {
			setIsFetching(false)
		}
	}

	return {
		isAuthenticated,
		isAdmin,
		account,
		isLoggingIn,
		isFetching,
		logIn,
		logOut,
		getCurrentAccount,
	}
}
