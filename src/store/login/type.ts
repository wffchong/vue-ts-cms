import { IUserInfo, IUserMenus } from '@/service/login/type'
export interface ILoginState {
    token: string
    userInfo: IUserInfo
    userMenus: IUserMenus
}
