import { AccountsPageComponent } from '../pages/AccoutsPage'
import { HomePageComponent } from '../pages/HomePage'
import { LoginPageComponent } from '../pages/LoginPage'
import { RouteType } from '../types/Route'
import { Pathnames } from './pathnames'

export const adminRoutes: RouteType[] = [
	{
		path: Pathnames.admin.accounts,
		Component: AccountsPageComponent,
	},
	{
		path: Pathnames.admin.accountsDetails,
		Component: AccountsPageComponent,
	},
]

export const userRoutes: RouteType[] = [
	{
		path: Pathnames.user.home,
		Component: HomePageComponent,
	},
]

export const publicRoutes: RouteType[] = [
	{
		path: Pathnames.public.login,
		Component: LoginPageComponent,
	},
]
