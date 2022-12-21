import { useState } from 'react'
import { api } from '../api/api'
import { useAccountDetailsState } from '../context/AccountDetailsContext'
import { AccountType } from '../types/Account'
import { useAlert } from './useAlert'

export const useAccountDetails = () => {
	const { showErrorAlert } = useAlert()
	const { isFetching, setIsFetching, account, setAccount } = useAccountDetailsState()

	const getAccountDetails = async (login: string) => {
		try {
			setIsFetching(true)
			const { data } = await api.getAccount(login)
			setAccount(data)
		} catch {
			showErrorAlert('Unable to find account')
		} finally {
			setIsFetching(false)
		}
	}

	const [isUpdating, setIsUpdating] = useState(false)
	const updateAccount = async (account: AccountType) => {
		try {
			setIsUpdating(true)
			await api.updateAccount(account.login, account)
		} catch {
			showErrorAlert('Unable to update account')
		} finally {
			setIsUpdating(false)
		}
	}

	return {
		account,
		isFetching,
		getAccountDetails,
		isUpdating,
		updateAccount,
	}
}
