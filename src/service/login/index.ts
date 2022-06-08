import wffRequest from '../index'
import { IAccount, ApiResponse, ILoginResult, IUserInfo, IUserMenus } from './type'
enum LoginAPI {
    AccountLogin = '/login',
    RequestUserInfo = '/users/',
    RequestUserMenu = '/role/'
}

// 登录
export const accountLoginRequest = (account: IAccount) => {
    return wffRequest.post<ApiResponse<ILoginResult>>({
        url: LoginAPI.AccountLogin,
        data: account
    })
}

// 获取用户信息
export const requestUserInfoById = (id: number) => {
    return wffRequest.get<ApiResponse<IUserInfo>>({
        url: LoginAPI.RequestUserInfo + id
    })
}

// 获取用户菜单
export const requestUserMenusByRoleId = (id: number) => {
    return wffRequest.get<ApiResponse<IUserMenus>>({
        url: LoginAPI.RequestUserMenu + id
    })
}
