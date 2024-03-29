import type { Login, User, Global } from '@/service/interface'

/* LoginState */
export interface LoginState {
	token: string
	userInfo: Login.ResGetUserInfo | null
	userMenus: Login.UserMenu[]
	userPermissions: string[]
}

/* UserState */
export interface UserState {
	userList: User.UserInfo[]
	totalCount: number
}

/* GlobalState */
export interface GlobalState {
	entireRoles: Global.Role[]
	entireDepartments: Global.Department[]
	menuList: any[]
}

/* CommonState */
export interface CommonState {
	pageList: any[]
	pageCount: number
}
