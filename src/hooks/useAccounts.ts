import { useState } from 'react'
import { api } from '../api/api'
import { useAccountsState } from '../context/AccountsContext'
import { AccountTypeEnum } from '../enums/AccountType.enum'
import { AccountType } from '../types/Account'
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

	const [isCreating, setIsCreating] = useState(false)
	const createAccount = async (account: AccountType) => {
		try {
			setIsCreating(true)
			console.log(account)
			if (account.accountType === AccountTypeEnum.USER) {
				await api.createUserAccount(account)
			} else if (account.accountType === AccountTypeEnum.ADMIN) {
				await api.createAdminAccount(account)
			}
		} catch {
			showErrorAlert('Unable to create account')
		} finally {
			setIsCreating(false)
		}
	}

	return { accounts, isFetching, fetchAccounts, isCreating, createAccount }
}
