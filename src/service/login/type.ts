// 登录接口参数
export interface IAccount {
    name: string
    password: string
}

// 登录接口返回信息
export interface ILoginResult {
    id: number
    name: string
    token: string
}

// 用户信息
export interface IUserInfo {
    cellphone: number
    createAt: string
    department: IDepartment
    enable: number
    id: number
    name: string
    realname: string
    role: IRole
    updateAt: string
}

// 部门信息
export interface IDepartment {
    createAt: string
    id: number
    leader: string
    name: string
    parentId: number
    updateAt: string
}

// 角色信息
export interface IRole {
    createAt: string
    id: number
    intro: string
    name: string
    updateAt: string
}

// 用户菜单
export interface IUserMenus {
    id: number
    icon: string
    name: string
    sort: number
    type: number
    url: string
    children: IMenuChildren[]
}

// 子菜单
export interface IMenuChildren {
    id: number
    name: string
    parentId: number
    sort: number
    type: number
    url: string
    children: IMenuGrandChildren[]
}

// 孙菜单
export interface IMenuGrandChildren {
    id: number
    name: string
    parentId: number
    sort: number
    type: number
    url: string
    permission: string
}

// 统一的返回类型
export interface ApiResponse<T = any> {
    code: number
    data: T
}
