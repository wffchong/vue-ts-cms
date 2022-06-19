import wffRequest from '../../index'

import { ApiResponse, ISystemResponse } from './type'

// 获取用户管理中的table数据
export function getPageListData(url: string, queryInfo: any) {
    return wffRequest.post<ApiResponse<ISystemResponse>>({
        url,
        data: queryInfo
    })
}
