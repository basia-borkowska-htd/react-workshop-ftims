import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { Pathnames } from '../../../router/pathnames'
import { useLocation, useNavigate } from 'react-router-dom'

interface UserLayoutProps {
	children: ReactNode
}

export const AdminLayout = ({ children }: UserLayoutProps) => {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const getPageName = () => {
		if (pathname.includes(Pathnames.admin.accounts)) return 'Accounts'
		return 'Account Details'
	}

	return (
		<div>
			<AppBar position="static">
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography variant="h4" sx={{ mx: 2 }}>
						{getPageName()}
					</Typography>
					<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button onClick={() => navigate(Pathnames.user.home)} sx={{ my: 2, color: 'white' }}>
							Go to Home
						</Button>
						<Button
							onClick={() => navigate(Pathnames.public.logout)}
							sx={{ my: 2, color: 'white' }}
						>
							Logout
						</Button>
					</Box>
				</Toolbar>
			</AppBar>

			<Container sx={{ p: 2 }}>{children}</Container>
		</div>
	)
}
