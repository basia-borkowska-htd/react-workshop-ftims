import { AccountTypeEnum } from '../enums/AccountType.enum'

type AccountType = {
	id: string
	email: string
	login: string
	password: string
	accountType: AccountTypeEnum
}

export interface UserAccountType extends AccountType {
	NIP: string
}

export interface AdminAccountType extends AccountType {
	phone: string
}

export type GenericUserType = UserAccountType | AdminAccountType
