import { createContext, ReactNode, useContext, useState } from 'react'
import { GenericAccountType } from '../types/Account'

interface AccountDetailsState {
	isFetching: boolean
	setIsFetching: (isFetching: boolean) => void
	account: GenericAccountType | null
	setAccount: (item: GenericAccountType) => void
}

export const AccountDetailsStateContext = createContext<AccountDetailsState | null>(null)

export const AccountDetailsStateContextProvider = ({ children }: { children: ReactNode }) => {
	const [isFetching, setIsFetching] = useState(false)
	const [account, setAccount] = useState<GenericAccountType | null>(null)

	return (
		<AccountDetailsStateContext.Provider value={{ isFetching, setIsFetching, account, setAccount }}>
			{children}
		</AccountDetailsStateContext.Provider>
	)
}

export const useAccountDetailsState = () => {
	const accountDetailsState = useContext(AccountDetailsStateContext)

	if (!accountDetailsState) {
		throw new Error('You forgot about AccountDetailsStateContextProvider!')
	}

	return accountDetailsState
}
