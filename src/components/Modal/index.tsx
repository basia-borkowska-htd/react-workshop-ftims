import { Button, Modal, Typography } from '@mui/material'
import { ReactElement } from 'react'
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from './styles'

interface ModalProps {
	title?: string
	open: boolean
	handleConfirm: () => void
	handleClose: () => void
	children: ReactElement
}

export const ModalComponent = ({
	title,
	open,
	handleConfirm,
	handleClose,
	children,
}: ModalProps) => {
	return (
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
					<Button variant="outlined" onClick={handleClose} color="error">
						Close
					</Button>
					<Button variant="contained" onClick={handleConfirm}>
						Confirm
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
