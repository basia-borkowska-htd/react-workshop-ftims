import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateAccountModalComponent } from '../../../components/CreateAccountModal'
import { LoaderComponent } from '../../../components/Loader'
import { useAccounts } from '../../../hooks/useAccounts'
import { Pathnames } from '../../../router/pathnames'
import { ButtonsContainer } from './styles'

export const AccountsPageComponent = () => {
	const navigate = useNavigate()
	const { accounts, isFetching, fetchAccounts } = useAccounts()

	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		fetchAccounts()
	}

	useEffect(() => {
		if (!accounts) {
			fetchAccounts()
		}
	}, [])

	const renderTable = () => {
		if (!accounts || accounts.length === 0) {
			return <div>No results</div>
		}

		return (
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Last Name</TableCell>
						<TableCell>Login</TableCell>
						<TableCell>NIP</TableCell>
						<TableCell>Phone number</TableCell>
						<TableCell align="right">Email Address</TableCell>
						<TableCell align="right">Account Type</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{accounts.map(({ id, email, login, firstName, lastName, NIP, phone, accountType }) => (
						<TableRow
							key={id}
							hover
							onClick={() => navigate(Pathnames.admin.accountDetails.replace(':login', login))}
							sx={{ cursor: 'pointer' }}
						>
							<TableCell component="th" scope="row">
								{firstName}
							</TableCell>
							<TableCell component="th" scope="row">
								{lastName}
							</TableCell>
							<TableCell component="th" scope="row">
								{login}
							</TableCell>
							<TableCell component="th" scope="row">
								{NIP || '-'}
							</TableCell>
							<TableCell component="th" scope="row">
								{phone || '-'}
							</TableCell>
							<TableCell align="right">{email}</TableCell>
							<TableCell align="right">{accountType}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		)
	}

	return (
		<div>
			<ButtonsContainer>
				<Button onClick={fetchAccounts} disabled={isFetching} sx={{ my: 2 }}>
					Reload
				</Button>

				<Button onClick={openModal} variant="contained" sx={{ my: 2 }}>
					Create new
				</Button>
			</ButtonsContainer>

			<TableContainer component={Paper}>
				{isFetching ? <LoaderComponent small /> : renderTable()}
			</TableContainer>

			<CreateAccountModalComponent open={isModalOpen} handleClose={closeModal} />
		</div>
	)
}
