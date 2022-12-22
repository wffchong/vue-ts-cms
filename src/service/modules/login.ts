import { httpRequest } from '@/service'
import type { Login } from '../interface'

export const accountLoginRequest = (account: Login.ReqAccountLoginForm) => {
	return httpRequest.post<Login.ResLogin>({
		url: '/login',
		data: account
	})
}
