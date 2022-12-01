import { AccountDetailsPageComponent } from '../pages/admin/AccountDetailsPage'
import { AccountsPageComponent } from '../pages/admin/AccountsPage'
import { LoginPageComponent } from '../pages/public/LoginPage'
import { HomePageComponent } from '../pages/user/HomePage'
import { RouteType } from '../types/Route'
import { Pathnames } from './pathnames'

export const adminRoutes: RouteType[] = [
	{
		path: Pathnames.admin.accounts,
		component: AccountsPageComponent,
		exact: true,
	},
	{
		path: Pathnames.admin.accountDetails,
		component: AccountDetailsPageComponent,
		exact: true,
	},
]

export const userRoutes: RouteType[] = [
	{
		path: Pathnames.user.home,
		component: HomePageComponent,
		exact: true,
	},
]

export const publicRoutes: RouteType[] = [
	{
		path: Pathnames.public.login,
		component: LoginPageComponent,
		exact: true,
	},
]
