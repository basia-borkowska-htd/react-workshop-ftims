import { useEffect } from 'react'
import { api } from '../../../api/api'
import { LoaderComponent } from '../../../components/Loader'
import { TOKEN } from '../../../constants'
import { useAlert } from '../../../hooks/useAlert'
import { Pathnames } from '../../../router/pathnames'

export const LogoutPageComponent = () => {
	const { showErrorAlert } = useAlert()

	useEffect(() => {
		;(async () => {
			try {
				await api.logOut()
			} catch {
				showErrorAlert('Logout failure!')
			} finally {
				localStorage.removeItem(TOKEN)
				window.location.href = Pathnames.public.login
			}
		})()
	}, [])

	return <LoaderComponent />
}
