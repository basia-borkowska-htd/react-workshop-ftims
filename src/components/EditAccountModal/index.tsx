import { AccountType } from '../../types/Account'
import { ModalComponent, ModalProps } from '../Modal'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAccountDetails } from '../../hooks/useAccountDetails'
import { FormContainer } from './styles'
import { FormHelperText, TextField } from '@mui/material'
import { LoaderComponent } from '../Loader'

interface EditAccountModalProps extends Omit<ModalProps, 'children' | 'handleConfirm'> {
	account: AccountType
}

const schema = yup.object({
	firstName: yup.string().required('Name is required').min(2, 'Must be at least 2 characters'),
	lastName: yup.string().required('Last Name is required').min(2, 'Must be at least 2 characters'),
	email: yup
		.string()
		.email('Provide valid email address')
		.required('Email is required')
		.min(2, 'Must be at least 2 characters'),
})

type LoginFormType = yup.InferType<typeof schema>

export const EditAccountModalComponent = ({
	account,
	open,
	handleClose,
}: EditAccountModalProps) => {
	const { isUpdating, updateAccount } = useAccountDetails()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormType>({
		resolver: yupResolver(schema),
	})

	const onSubmit = handleSubmit(async ({ firstName, lastName, email }) => {
		await updateAccount({ ...account, firstName, lastName, email })
		handleClose()
	})

	return (
		<ModalComponent
			title={`Edit account details: ${account.login}`}
			open={open}
			handleClose={handleClose}
			handleConfirm={onSubmit}
		>
			{isUpdating ? (
				<LoaderComponent />
			) : (
				<FormContainer>
					<form onSubmit={onSubmit}>
						<TextField
							{...register('firstName')}
							margin="normal"
							fullWidth
							id="firstName"
							label="Name"
							name="firstName"
							defaultValue={account.firstName}
							autoFocus
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
							defaultValue={account.lastName}
						/>
						<FormHelperText id="lastName" error>
							{errors?.lastName?.message}
						</FormHelperText>

						<TextField
							{...register('email')}
							margin="normal"
							fullWidth
							name="email"
							label="Email"
							id="email"
							defaultValue={account.email}
						/>
						<FormHelperText id="email" error>
							{errors?.email?.message}
						</FormHelperText>
					</form>
				</FormContainer>
			)}
		</ModalComponent>
	)
}
