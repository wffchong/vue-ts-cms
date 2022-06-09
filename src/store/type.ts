import { ILoginState } from './login/type'
export interface IRootState {
    name: string
    age: number
}

// 处理vuex不好获取数据的办法
export interface IRootWithModule {
    login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
