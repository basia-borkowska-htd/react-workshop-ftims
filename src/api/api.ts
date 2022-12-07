import { AccountType } from '../types/Account'
import { ApiResponseType } from '../types/ApiResponse'
import { apiWithConfig } from './api.config'

export const api = {
	logIn: (login: string, password: string): ApiResponseType<AccountType> => {
		return apiWithConfig.put('/accounts/log_in', { login, password })
	},
	logOut: (): ApiResponseType<AccountType> => {
		return apiWithConfig.put('/accounts/log_out')
	},
	getCurrentAccount: (): ApiResponseType<AccountType> => {
		return apiWithConfig.get('/accounts/existing_account')
	},
	getAccounts: (): ApiResponseType<AccountType[]> => {
		return apiWithConfig.get('/accounts')
	},
	getAccount: (login: string): ApiResponseType<AccountType> => {
		return apiWithConfig.get(`/accounts/${login}`)
	},
	createAccount: (login: string): ApiResponseType<AccountType> => {
		return apiWithConfig.post('/accounts', { login })
	},
	updateAccount: (login: string, model: AccountType): ApiResponseType<AccountType> => {
		return apiWithConfig.put(`/accounts/${login}`, { model })
	},
	deleteAccount: (login: string) => {
		return apiWithConfig.delete(`/accounts/${login}`)
	},
}
