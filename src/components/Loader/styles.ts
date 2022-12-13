import styled from 'styled-components'

interface DivExtendedProps {
	readonly isSmall: boolean
}

export const LoaderWrapper = styled.div<DivExtendedProps>`
	width: 100%;
	height: ${({ isSmall }) => (isSmall ? '10rem' : '100vh')};
	display: flex;
	align-items: center;
	justify-content: center;
`
