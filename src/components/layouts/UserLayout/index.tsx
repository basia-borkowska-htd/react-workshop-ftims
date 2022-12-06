import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { Pathnames } from '../../../router/pathnames'
import { useNavigate } from 'react-router-dom'
import { useAccount } from '../../../hooks/useAccount'

interface UserLayoutProps {
	children: ReactNode
}

export const UserLayout = ({ children }: UserLayoutProps) => {
	const navigate = useNavigate()
	const { isAdmin } = useAccount()

	return (
		<div>
			<AppBar position="static">
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography variant="h4" sx={{ mx: 2 }}>
						HOME
					</Typography>
					<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						{isAdmin && (
							<Button
								onClick={() => navigate(Pathnames.admin.accounts)}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								Go to Admin Panel
							</Button>
						)}
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
