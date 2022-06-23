import wffRequest from '../../index'

import { ApiResponse, ISystemResponse } from './type'

// 获取用户管理中的table数据
export function getPageListData(url: string, queryInfo: any) {
    return wffRequest.post<ApiResponse<ISystemResponse>>({
        url,
        data: queryInfo
    })
}

// 删除table中的数据
export function deletePageListData(url: string, id: number) {
    return wffRequest.delete<ApiResponse>({
        url: `${url}/${id}`
    })
}
