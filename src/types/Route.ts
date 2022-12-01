export type RouteType = {
	component: () => JSX.Element
	path: string
	exact?: boolean
}
