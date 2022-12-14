import { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAccount } from '../../api/hooks/useAccount'
import { PublicLayout } from '../../components/layouts/PublicLayout'
import { Pathnames } from '../pathnames'
import { adminRoutes, publicRoutes, userRoutes } from '../routes'

export const RoutesComponent = () => {
	const { account, isAdmin, isAuthenticated, isFetching, getCurrentAccount } = useAccount()

	useEffect(() => {
		if (!account) {
			getCurrentAccount()
		}
	}, [])

	if (isFetching) {
		return <div>Loading</div>
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
					<Route key={path} path={path} element={<Component />} />
				))}
			{isAuthenticated &&
				isAdmin &&
				adminRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
			<Route path="*" element={<Navigate to={Pathnames.public.login} replace />} />
		</Routes>
	)
}
