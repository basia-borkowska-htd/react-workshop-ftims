import { Route, Routes, Navigate } from 'react-router-dom'
import { useAccount } from '../../api/hooks/useAccount'
import { Pathnames } from '../pathnames'
import { adminRoutes, publicRoutes, userRoutes } from '../routes'

export const RoutesComponent = () => {
	const { isAdmin, isAuthenticated } = useAccount()
	return (
		<Routes>
			{publicRoutes.map(({ path, Component }) => (
				<Route key={path} path={path} element={<Component />} />
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
