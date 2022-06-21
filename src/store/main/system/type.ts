import { IUserList } from '@/service/main/system/type'

export interface ISystemState {
    usersList: IUserList[]
    usersCount: number
    roleList: any[]
    roleCount: number
    goodsList: any[]
    goodsCount: number
    menuList: any[]
}
