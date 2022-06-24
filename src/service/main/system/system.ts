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

// 新增table中的数据
export function addPageListData(url: string, newData: any) {
    return wffRequest.post<ApiResponse>({
        url,
        data: newData
    })
}

// 编辑table中的数据
export function editPageListData(url: string, editData: any) {
    return wffRequest.patch<ApiResponse>({
        url,
        data: editData
    })
}
