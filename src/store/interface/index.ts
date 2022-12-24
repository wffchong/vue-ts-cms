import type { Login } from '@/service/interface'

/* LoginState */
export interface LoginState {
	token: string
	userInfo: Login.ResGetUserInfo | null
	userMenus: Login.UserMenu[]
}
