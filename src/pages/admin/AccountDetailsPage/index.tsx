import { ListItemText, ListItem, Divider, Button } from '@mui/material'
import { useAccountDetails } from '../../../hooks/useAccountDetails'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LoaderComponent } from '../../../components/Loader'
import {
	Face as FaceIcon,
	Email as EmailIcon,
	LocalPhone as LocalPhoneIcon,
	Key as KeyIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	Badge as BadgeIcon,
	Numbers as NumbersIcon,
} from '@mui/icons-material'
import { AccountDetailsStateContextProvider } from '../../../context/AccountDetailsContext'
import { ButtonsContainer, DetailIcon, ListContainer, StyledList } from './styles'
import { AccountTypeEnum } from '../../../enums/AccountType.enum'
import { EditAccountModalComponent } from '../../../components/EditAccountModal'
import { Pathnames } from '../../../router/pathnames'
import { DeleteAccountModalComponent } from '../../../components/DeleteAccountModal'

const AccountDetailsPage = () => {
	const { login } = useParams<{ login: string }>()
	const navigate = useNavigate()
	const { account, isFetching, getAccountDetails } = useAccountDetails()

	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const openEditModal = () => {
		setIsEditModalOpen(true)
	}
	const closeEditModal = () => {
		setIsEditModalOpen(false)
		if (login) getAccountDetails(login)
	}

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const openDeleteModal = () => {
		setIsDeleteModalOpen(true)
	}
	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false)
		navigate(Pathnames.admin.accounts)
	}

	useEffect(() => {
		if (login) getAccountDetails(login)
	}, [login])

	if (isFetching) {
		return <LoaderComponent />
	}

	if (!account) {
		return <div>No results</div>
	}

	return (
		<>
			<ButtonsContainer>
				<Link to={Pathnames.admin.accounts}>{'< BACK'}</Link>
				<div>
					<Button
						variant="outlined"
						color="error"
						startIcon={<DeleteIcon />}
						onClick={openDeleteModal}
					>
						Delete
					</Button>
					<Button variant="contained" startIcon={<EditIcon />} onClick={openEditModal}>
						Edit
					</Button>
				</div>
			</ButtonsContainer>

			<ListContainer>
				<StyledList>
					<ListItem>
						<DetailIcon>
							<BadgeIcon />
						</DetailIcon>
						<ListItemText
							primary="Name and surname"
							secondary={account.firstName + ' ' + account.lastName || '-'}
						/>
					</ListItem>
					<Divider variant="fullWidth" component="li" />

					<ListItem>
						<DetailIcon>
							<FaceIcon />
						</DetailIcon>
						<ListItemText primary="Login" secondary={account.login || '-'} />
					</ListItem>
					<Divider variant="fullWidth" component="li" />

					<ListItem>
						<DetailIcon>
							<EmailIcon />
						</DetailIcon>
						<ListItemText primary="Email" secondary={account.email || '-'} />
					</ListItem>
					<Divider variant="fullWidth" component="li" />

					{account.accountType === AccountTypeEnum.ADMIN ? (
						<ListItem>
							<DetailIcon>
								<LocalPhoneIcon />
							</DetailIcon>
							<ListItemText primary="Phone number" secondary={account.phone || '-'} />
						</ListItem>
					) : (
						<ListItem>
							<DetailIcon>
								<NumbersIcon />
							</DetailIcon>
							<ListItemText primary="NIP" secondary={account.NIP || '-'} />
						</ListItem>
					)}

					<Divider variant="fullWidth" component="li" />
					<ListItem>
						<DetailIcon>
							<KeyIcon />
						</DetailIcon>
						<ListItemText primary="Account type" secondary={account.accountType || '-'} />
					</ListItem>
				</StyledList>
			</ListContainer>

			<EditAccountModalComponent
				account={account}
				open={isEditModalOpen}
				handleClose={closeEditModal}
			/>
			<DeleteAccountModalComponent
				account={account}
				open={isDeleteModalOpen}
				handleClose={closeDeleteModal}
			/>
		</>
	)
}

export const AccountDetailsPageComponent = () => (
	<AccountDetailsStateContextProvider>
		<AccountDetailsPage />
	</AccountDetailsStateContextProvider>
)
