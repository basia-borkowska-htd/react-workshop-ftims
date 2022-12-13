import { List } from '@mui/material'
import styled from 'styled-components'
import { colors } from '../../../styles/theme'

export const ButtonsContainer = styled.div`
	margin-top: 2rem;
	display: flex;
	gap: 1rem;
	justify-content: space-between;
	align-items: center;

	a {
		text-decoration: none;
		color: ${colors.primary};
	}

	div {
		display: flex;
		gap: 1rem;
	}
`

export const StyledList = styled(List)`
	width: 100%;
`

export const ListContainer = styled.div`
	margin-top: 2rem;
	display: flex;
	justify-content: center;
`

export const DetailIcon = styled.span`
	margin-right: 1rem;
`
