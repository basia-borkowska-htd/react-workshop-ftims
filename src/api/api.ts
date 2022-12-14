import { AccountType } from '../types/Account'
import { ApiResponseType } from '../types/ApiResponse'
import { apiWithConfig } from './api.config'

export const api = {
	logIn: (login: string, password: string): ApiResponseType<AccountType> => {
		return apiWithConfig.put('/accounts/log_in', { login, password })
	},
}
