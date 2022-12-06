import { CircularProgress, Typography } from '@mui/material'
import { Container } from './styles'

export const HomePageComponent = () => {
	return (
		<Container>
			<CircularProgress />
			<Typography variant="h3">Still in progress...</Typography>
		</Container>
	)
}
