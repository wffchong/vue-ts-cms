import type { Login, User, Global } from '@/service/interface'

/* LoginState */
export interface LoginState {
	token: string
	userInfo: Login.ResGetUserInfo | null
	userMenus: Login.UserMenu[]
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
}
