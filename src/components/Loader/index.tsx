import { CircularProgress } from '@mui/material'
import { LoaderWrapper } from './styles'

interface LoaderProps {
	small?: boolean
}

export const LoaderComponent = ({ small = false }: LoaderProps) => (
	<LoaderWrapper isSmall={small}>
		<CircularProgress />
	</LoaderWrapper>
)
