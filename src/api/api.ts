import { GenericAccountType } from '../types/Account'
import { ApiResponseType } from '../types/ApiResponse'
import { apiWithConfig } from './api.config'

export const api = {
	getAccounts: (): ApiResponseType<GenericAccountType[]> => {
		return apiWithConfig.get('/accounts')
	},
	getAccount: (login: string): ApiResponseType<GenericAccountType> => {
		return apiWithConfig.get(`/accounts/${login}`)
	},
	createAccount: (login: string): ApiResponseType<GenericAccountType> => {
		return apiWithConfig.post('/accounts', { login })
	},
	updateAccount: (
		login: string,
		model: GenericAccountType,
	): ApiResponseType<GenericAccountType> => {
		return apiWithConfig.post(`/accounts/${login}`, { model })
	},
	deleteAccount: (login: string) => {
		return apiWithConfig.delete(`/accounts/${login}`)
	},
}
// TODO issues and questions:
// shouldn't we operate on id instead od login? (we can edit login)
// check return types
