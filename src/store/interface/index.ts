import type { Login, User } from '@/service/interface'

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
