import { AccountTypeEnum } from '../enums/AccountType.enum'

export interface AccountType extends AdminAccountType, UserAccountType {
	id: string
	email: string
	login: string
	firstName: string
	lastName: string
	password: string
	token?: string
	accountType?: AccountTypeEnum
}

export interface UserAccountType {
	NIP?: string
}
export interface AdminAccountType {
	phone?: string
}
