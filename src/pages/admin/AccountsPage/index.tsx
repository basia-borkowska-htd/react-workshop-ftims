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
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoaderComponent } from '../../../components/Loader'
import { useAccounts } from '../../../hooks/useAccounts'
import { Pathnames } from '../../../router/pathnames'

export const AccountsPageComponent = () => {
	const navigate = useNavigate()
	const { accounts, isFetching, fetchAccounts } = useAccounts()

	useEffect(() => {
		if (!accounts) {
			fetchAccounts()
		}
	}, [])

	const renderTable = () => {
		if (!accounts || accounts.length === 0) {
			return <div>There is no any results</div>
		}

		return (
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Login</TableCell>
						<TableCell align="right">Email Address</TableCell>
						<TableCell align="right">Account Type</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{accounts.map(({ id, email, login, accountType }) => (
						<TableRow
							key={id}
							hover
							onClick={() => navigate(Pathnames.admin.accountDetails.replace(':login', login))}
							sx={{ cursor: 'pointer' }}
						>
							<TableCell component="th" scope="row">
								{login}
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
			<Button onClick={fetchAccounts} disabled={isFetching} sx={{ my: 2 }}>
				Reload
			</Button>

			<TableContainer component={Paper}>
				{isFetching ? <LoaderComponent small /> : renderTable()}
			</TableContainer>
		</div>
	)
}
