import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { AccountType } from '../types/Account'

interface AccountState {
	account: AccountType | null
	setAccount: (item: AccountType | null) => void
	isLoggingIn: boolean
	setIsLoggingIn: (value: boolean) => void
	isFetching: boolean
	setIsFetching: (value: boolean) => void
}

const AccountStateContext = createContext<AccountState | null>(null)

export const AccountStateContextProvider = ({ children }: { children: ReactNode }) => {
	const [account, setAccount] = useState<AccountType | null>(null)
	const [isLoggingIn, setIsLoggingIn] = useState(false)
	const [isFetching, setIsFetching] = useState(false)

	useEffect(() => {
		if (account?.token) {
			localStorage.setItem('token', JSON.stringify(account.token))
		}
	}, [account])

	return (
		<AccountStateContext.Provider
			value={{ account, setAccount, setIsFetching, isFetching, isLoggingIn, setIsLoggingIn }}
		>
			{children}
		</AccountStateContext.Provider>
	)
}

export const useAccountState = () => {
	const accountState = useContext(AccountStateContext)
	if (!accountState) {
		throw new Error('No context provider')
	}

	return accountState
}
