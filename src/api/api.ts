import { GenericUserType } from '../types/Account'
import { ApiResponseType } from '../types/ApiResponse'
import { apiWithConfig } from './api.config'

export const api = {
	getAccounts: (): ApiResponseType<GenericUserType[]> => {
		return apiWithConfig.get('/accounts')
	},
	getAccount: (login: string): ApiResponseType<GenericUserType> => {
		return apiWithConfig.get(`/accounts/${login}`)
	},
	createAccount: (login: string): ApiResponseType<GenericUserType> => {
		return apiWithConfig.post('/accounts', { login })
	},
	updateAccount: (login: string, model: GenericUserType): ApiResponseType<GenericUserType> => {
		return apiWithConfig.post(`/accounts/${login}`, { model })
	},
	deleteAccount: (login: string) => {
		return apiWithConfig.delete(`/accounts/${login}`)
	},
}
// TODO issues and questions:
// shouldn't we operate on id instead od login? (we can edit login)
// check return types
