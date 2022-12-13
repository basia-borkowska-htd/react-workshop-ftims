import { Button, Modal, Typography } from '@mui/material'
import { ReactElement } from 'react'
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from './styles'

export interface ModalProps {
	title?: string
	open: boolean
	diasbleButtons?: boolean
	handleConfirm: () => void
	handleClose: () => void
	children: ReactElement
}

export const ModalComponent = ({
	title,
	open,
	diasbleButtons = false,
	handleConfirm,
	handleClose,
	children,
}: ModalProps) => (
	<Modal
		open={open}
		onClose={handleClose}
		aria-labelledby="modal-modal-title"
		aria-describedby="modal-modal-description"
	>
		<ModalContent>
			{title && (
				<ModalHeader>
					<Typography variant="h5">{title}</Typography>
				</ModalHeader>
			)}
			<ModalBody>{children}</ModalBody>
			<ModalFooter>
				<Button variant="outlined" onClick={handleClose} disabled={diasbleButtons} color="error">
					Close
				</Button>
				<Button variant="contained" onClick={handleConfirm} disabled={diasbleButtons}>
					Confirm
				</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>
)
