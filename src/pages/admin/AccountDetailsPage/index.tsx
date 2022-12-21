import { ListItemText, ListItem, Divider, Button } from '@mui/material'
import { useAccountDetails } from '../../../hooks/useAccountDetails'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
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

const AccountDetailsPage = () => {
	const { login } = useParams<{ login: string }>()
	const { account, isFetching, getAccountDetails } = useAccountDetails()

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
				<Button
					variant="outlined"
					color="error"
					startIcon={<DeleteIcon />}
					onClick={() => alert('Not implemented yet.')}
				>
					Delete
				</Button>
				<Button
					variant="contained"
					startIcon={<EditIcon />}
					onClick={() => alert('Not implemented yet.')}
				>
					Edit
				</Button>
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
		</>
	)
}

export const AccountDetailsPageComponent = () => (
	<AccountDetailsStateContextProvider>
		<AccountDetailsPage />
	</AccountDetailsStateContextProvider>
)
