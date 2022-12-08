import { AccountType } from '../../types/Account'
import { ModalComponent, ModalProps } from '../Modal'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAccountDetails } from '../../hooks/useAccountDetails'
import { FormHelperText, TextField } from '@mui/material'
import { LoaderComponent } from '../Loader'

interface DeleteAccountModalProps extends Omit<ModalProps, 'children'> {
	account: AccountType
}

export const EditAccountModalComponent = ({
	account,
	open,
	handleClose,
}: DeleteAccountModalProps) => {
	const { isUpdating, deleteAccount } = useAccountDetails()

	const onSubmit = async () => {
		await deleteAccount(account.login)
		handleClose()
	}

	return (
		<ModalComponent
			title={`Remove account: ${account.login}`}
			open={open}
			handleClose={handleClose}
			handleConfirm={onSubmit}
			diasbleButtons={isUpdating}
		>
			<div>Are you sure you want to delete this account? All data will be lost.</div>
		</ModalComponent>
	)
}
