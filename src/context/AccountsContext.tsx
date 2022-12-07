import { createContext, ReactNode, useContext, useState } from 'react'
import { AccountType } from '../types/Account'

interface AccountsState {
	isFetching: boolean
	setIsFetching: (isFetching: boolean) => void
	accounts: AccountType[]
	setAccounts: (item: AccountType[]) => void
}

export const AccountsStateContext = createContext<AccountsState | null>(null)

export const AccountsStateContextProvider = ({ children }: { children: ReactNode }) => {
	const [isFetching, setIsFetching] = useState(false)
	const [accounts, setAccounts] = useState<AccountType[]>([])

	return (
		<AccountsStateContext.Provider value={{ isFetching, setIsFetching, accounts, setAccounts }}>
			{children}
		</AccountsStateContext.Provider>
	)
}

export const useAccountsState = () => {
	const accountsState = useContext(AccountsStateContext)

	if (!accountsState) {
		throw new Error('You forgot about AccountsStateContextProvider!')
	}

	return accountsState
}
