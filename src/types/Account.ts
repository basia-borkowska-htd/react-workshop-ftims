import { AccountTypeEnum } from '../enums/AccountType.enum'

export type AccountType = {
	id: string
	email: string
	login: string
	password: string
	accountType?: AccountTypeEnum
	token?: string
}

export interface UserAccountType extends AccountType {
	NIP?: string
}

export interface AdminAccountType extends AccountType {
	phone?: string
}

export type GenericAccountType = UserAccountType | AdminAccountType
