import { ILoginState } from './login/type'
import { IDashboardState } from './main/analysis/type'
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
    dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
