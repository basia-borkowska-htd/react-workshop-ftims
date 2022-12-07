import { ThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '../../components/layouts/AdminLayout'
import { PublicLayout } from '../../components/layouts/PublicLayout'
import { UserLayout } from '../../components/layouts/UserLayout'
import { LoaderComponent } from '../../components/Loader'
import { useAccount } from '../../hooks/useAccount'
import { adminTheme, userTheme } from '../../styles/theme'
import { Pathnames } from '../pathnames'
import { adminRoutes, publicRoutes, userRoutes } from '../routes'

export const RoutesComponent = () => {
	const { account, isAuthenticated, isAdmin, isFetching, getCurrentAccount } = useAccount()

	useEffect(() => {
		if (!account) {
			getCurrentAccount()
		}
	}, [])

	if (isFetching) {
		return <LoaderComponent />
	}

	return (
		<Routes>
			{publicRoutes.map(({ path, Component }) => (
				<Route
					key={path}
					path={path}
					element={
						<PublicLayout>
							<Component />
						</PublicLayout>
					}
				/>
			))}

			{isAuthenticated &&
				userRoutes.map(({ path, Component }) => (
					<Route
						key={path}
						path={path}
						element={
							<ThemeProvider theme={userTheme}>
								<UserLayout>
									<Component />
								</UserLayout>
							</ThemeProvider>
						}
					/>
				))}

			{isAuthenticated &&
				isAdmin &&
				adminRoutes.map(({ path, Component }) => (
					<Route
						key={path}
						path={path}
						element={
							<ThemeProvider theme={adminTheme}>
								<AdminLayout>
									<Component />
								</AdminLayout>
							</ThemeProvider>
						}
					/>
				))}

			<Route path="*" element={<Navigate to={Pathnames.public.login} replace />} />
		</Routes>
	)
}
