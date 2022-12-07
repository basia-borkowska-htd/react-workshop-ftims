import { AccountTypeEnum } from '../enums/AccountType.enum'

export interface AccountType extends UserAccountType, AdminAccountType {
	id: string
	email: string
	login: string
	firstName: string
	lastName: string
	password: string
	accountType?: AccountTypeEnum
	token?: string
}

export interface UserAccountType {
	NIP?: string
}

export interface AdminAccountType {
	phone?: string
}
