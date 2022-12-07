import { createContext, ReactNode, useContext, useState } from 'react'
import { GenericAccountType } from '../types/Account'

interface AccountsState {
	isFetching: boolean
	setIsFetching: (isFetching: boolean) => void
	accounts: GenericAccountType[] | null
	setAccounts: (item: GenericAccountType[] | null) => void
}

export const SHOPPING_CART = 'SHOPPING_CART'

export const AccountsStateContext = createContext<AccountsState | null>(null)

export const AccountsStateContextProvider = ({ children }: { children: ReactNode }) => {
	const [isFetching, setIsFetching] = useState(false)
	const [accounts, setAccounts] = useState<GenericAccountType[] | null>(null)

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
