import { ILoginState } from './login/type'
import { ISystemState } from './main/system/type'
export interface IRootState {
    entireDepartment: any[]
    entireRole: any[]
    entireMenu: any[]
}

// 处理vuex不好获取数据的办法
export interface IRootWithModule {
    login: ILoginState
    system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
