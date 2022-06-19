export interface ISystemResponse {
    list: IUserList[]
    totalCount: number
}

export interface IUserList {
    id: number
    name: string
    realname: string
    cellphone: number
    enable: number
    departmentId: number
    roleId: number
    createAt: string
    updateAt: string
}

export interface ApiResponse<T = any> {
    code: number
    data: T
}
