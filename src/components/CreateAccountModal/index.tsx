import { AccountType } from '../../types/Account'
import { ModalComponent, ModalProps } from '../Modal'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormContainer } from './styles'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { LoaderComponent } from '../Loader'
import { AccountTypeEnum } from '../../enums/AccountType.enum'
import { useState } from 'react'
import { useAccounts } from '../../hooks/useAccounts'

type CreateAccountModalProps = Omit<ModalProps, 'children' | 'handleConfirm'>

const schema = yup.object({
	email: yup
		.string()
		.email('Provide valid email address')
		.required('Email is required')
		.min(2, 'Must be at least 2 characters'),
	firstName: yup.string().required('Name is required').min(2, 'Must be at least 2 characters'),
	lastName: yup.string().required('Last Name is required').min(2, 'Must be at least 2 characters'),
	login: yup.string().required('Last Name is required').min(2, 'Must be at least 2 characters'),
	password: yup.string().required('Password is required').min(2, 'Must be at least 2 characters'),
	NIP: yup.string(),
	phone: yup.string(),
})

type LoginFormType = yup.InferType<typeof schema>

export const CreateAccountModalComponent = ({ open, handleClose }: CreateAccountModalProps) => {
	const { isCreating, createAccount } = useAccounts()
	const [selectedAccountType, setSelectedAccountType] = useState<AccountTypeEnum>(
		AccountTypeEnum.USER,
	)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormType>({
		resolver: yupResolver(schema),
	})

	const onSubmit = handleSubmit(
		async ({ email, firstName, lastName, login, password, NIP, phone }) => {
			const account: AccountType = {
				email,
				login,
				firstName,
				lastName,
				password,
				accountType: selectedAccountType,
				NIP: selectedAccountType === AccountTypeEnum.USER ? NIP : undefined,
				phone: selectedAccountType === AccountTypeEnum.ADMIN ? phone : undefined,
			}

			await createAccount(account)
			handleClose()
		},
	)

	return (
		<ModalComponent
			title="Create new account"
			open={open}
			handleClose={handleClose}
			handleConfirm={onSubmit}
			diasbleButtons={isCreating}
		>
			{isCreating ? (
				<LoaderComponent small />
			) : (
				<FormContainer>
					<form onSubmit={onSubmit}>
						<TextField
							{...register('email')}
							margin="normal"
							fullWidth
							name="email"
							label="Email"
							id="email"
						/>
						<FormHelperText id="email" error>
							{errors?.email?.message}
						</FormHelperText>

						<TextField
							{...register('firstName')}
							margin="normal"
							fullWidth
							id="firstName"
							label="Name"
							name="firstName"
						/>
						<FormHelperText id="firstName" error>
							{errors?.firstName?.message}
						</FormHelperText>

						<TextField
							{...register('lastName')}
							margin="normal"
							fullWidth
							name="lastName"
							label="Last Name"
							id="lastName"
						/>
						<FormHelperText id="lastName" error>
							{errors?.lastName?.message}
						</FormHelperText>

						<TextField
							{...register('login')}
							margin="normal"
							fullWidth
							name="login"
							label="Login"
							id="login"
						/>
						<FormHelperText id="login" error>
							{errors?.login?.message}
						</FormHelperText>

						<TextField
							{...register('password')}
							margin="normal"
							fullWidth
							name="password"
							label="Password"
							id="password"
							type="password"
						/>
						<FormHelperText id="password" error>
							{errors?.password?.message}
						</FormHelperText>

						<FormControl fullWidth>
							<InputLabel id="account-type-label">Account Type</InputLabel>
							<Select
								labelId="account-type-label"
								id="account-type"
								value={selectedAccountType}
								label="Account Type"
								onChange={(e) => setSelectedAccountType(e.target.value as AccountTypeEnum)}
							>
								<MenuItem value={AccountTypeEnum.USER}>{AccountTypeEnum.USER}</MenuItem>
								<MenuItem value={AccountTypeEnum.ADMIN}>{AccountTypeEnum.ADMIN}</MenuItem>
							</Select>
						</FormControl>

						{selectedAccountType === AccountTypeEnum.USER ? (
							<>
								<TextField
									{...register('NIP')}
									margin="normal"
									fullWidth
									name="NIP"
									label="NIP"
									id="NIP"
								/>
								<FormHelperText id="NIP" error>
									{errors?.NIP?.message}
								</FormHelperText>
							</>
						) : (
							<>
								<TextField
									{...register('phone')}
									margin="normal"
									fullWidth
									name="phone"
									label="Phone number"
									id="phone"
								/>
								<FormHelperText id="phone" error>
									{errors?.phone?.message}
								</FormHelperText>
							</>
						)}
					</form>
				</FormContainer>
			)}
		</ModalComponent>
	)
}
