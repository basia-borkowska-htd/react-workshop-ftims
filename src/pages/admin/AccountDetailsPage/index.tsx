import { ListItemText, ListItem, List, Divider } from '@mui/material'
import { useAccountDetails } from '../../../hooks/useAccountDetails'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { LoaderComponent } from '../../../components/Loader'
import { useAccount } from '../../../hooks/useAccount'
import {
	Face as FaceIcon,
	Email as EmailIcon,
	LocalPhone as LocalPhoneIcon,
	Badge as BadgeIcon,
	Key as KeyIcon,
} from '@mui/icons-material'
import { AccountDetailsStateContextProvider } from '../../../context/AccountDetailsContext'

const AccountDetailsPage = () => {
	const { login } = useParams<{ login: string }>()
	const { account, isFetching, getAccountDetails } = useAccountDetails()
	const { isAdmin } = useAccount()

	useEffect(() => {
		if (login) getAccountDetails(login)
	}, [login])

	if (isFetching) {
		return <LoaderComponent />
	}

	if (!account) {
		return <div>There is no results</div>
	}

	return (
		<List
			sx={{
				width: '100%',
				maxWidth: 360,
				bgcolor: 'background.paper',
			}}
		>
			<ListItem>
				<FaceIcon />
				<ListItemText primary="Login" secondary={account.login} />
			</ListItem>
			<Divider variant="inset" component="li" />

			<ListItem>
				<EmailIcon />
				<ListItemText primary="Email" secondary={account.email} />
			</ListItem>
			<Divider variant="inset" component="li" />

			{isAdmin ? (
				<ListItem>
					<LocalPhoneIcon />
					<ListItemText primary="Phone number" secondary={account.phone} />
				</ListItem>
			) : (
				<ListItem>
					<BadgeIcon />
					<ListItemText primary="NIP" secondary={account.NIP} />
				</ListItem>
			)}

			<Divider variant="inset" component="li" />
			<ListItem>
				<KeyIcon />
				<ListItemText primary="Account type" secondary={account.accountType} />
			</ListItem>
		</List>
	)
}

export const AccountDetailsPageComponent = () => (
	<AccountDetailsStateContextProvider>
		<AccountDetailsPage />
	</AccountDetailsStateContextProvider>
)
