import styled from 'styled-components'

export const ModalContent = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	box-shadow: 24;
	border-radius: 0.25rem;
	min-width: 40rem;
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

export const ModalHeader = styled.div`
	position: relative;
	padding: 1.25rem;
`

export const ModalBody = styled.div`
	padding: 1.25rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

export const ModalFooter = styled.div`
	position: relative;
	padding: 1.25rem;
	display: flex;
	justify-content: flex-end;
	gap: 1rem;
`
