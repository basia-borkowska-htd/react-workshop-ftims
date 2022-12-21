import { AccountType } from '../../types/Account'
import { ModalComponent, ModalProps } from '../Modal'
import { useAccountDetails } from '../../hooks/useAccountDetails'

interface DeleteAccountModalProps extends Omit<ModalProps, 'children' | 'handleConfirm'> {
	account: AccountType
}

export const DeleteAccountModalComponent = ({
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
