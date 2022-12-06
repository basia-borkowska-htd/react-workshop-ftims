import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material'
import { useEffect } from 'react'
import { LoaderComponent } from '../../../components/Loader'
import { useAccounts } from '../../../hooks/useAccounts'

export const AccountsPageComponent = () => {
	const { accounts, isFetching, fetchAccounts } = useAccounts()

	useEffect(() => {
		fetchAccounts()
	}, [])

	if (isFetching) {
		return <LoaderComponent />
	}

	if (!accounts || accounts.length === 0) {
		return <div>There is no any results</div>
	}

	return (
		<TableContainer component={Paper}>
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
						<TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell component="th" scope="row">
								{login}
							</TableCell>
							<TableCell align="right">{email}</TableCell>
							<TableCell align="right">{accountType}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
