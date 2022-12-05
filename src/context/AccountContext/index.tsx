import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { TOKEN } from '../../constants'
import { AccountType } from '../../types/Account'

interface AccountState {
	account?: AccountType
	setAccount: (item: AccountType) => void
}

export const SHOPPING_CART = 'SHOPPING_CART'

export const AccountStateContext = createContext<AccountState | null>(null)

export const AccountStateContextProvider = ({ children }: { children: ReactNode }) => {
	const [account, setAccount] = useState<AccountType>()

	useEffect(() => {
		if (account?.token) {
			localStorage.setItem(TOKEN, JSON.stringify(account.token))
		}
	}, [account])

	return (
		<AccountStateContext.Provider value={{ account, setAccount }}>
			{children}
		</AccountStateContext.Provider>
	)
}

export const useAccountState = () => {
	const accountState = useContext(AccountStateContext)

	if (!accountState) {
		throw new Error('You forgot about AccountStateContextProvider!')
	}

	return accountState
}
