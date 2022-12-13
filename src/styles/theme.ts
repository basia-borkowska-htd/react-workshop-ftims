import { createTheme } from '@mui/material'

export const colors = {
	primary: '#CC3A00',
	secondary: '#B88400',
	error: '#CC3A00',
	warning: '#B4CC00',
	info: '#00B8CC',
	success: '#28E247',
}

export const adminTheme = createTheme({
	palette: {
		primary: {
			main: colors.primary,
		},
		secondary: {
			main: colors.secondary,
		},
		error: {
			main: colors.error,
		},
		warning: {
			main: colors.warning,
		},
		info: {
			main: colors.info,
		},
		success: {
			main: colors.success,
		},
	},
})

export const userTheme = createTheme({})
