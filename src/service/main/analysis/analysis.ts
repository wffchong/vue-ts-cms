import wffRequest from '../../index'
import { ApiResponse } from '../system/type'

enum DashboardApi {
    categoryGoodsCount = '/goods/category/count',
    categoryGoodsSale = '/goods/category/sale',
    categoryGoodsFavor = '/goods/category/favor',
    addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
    return wffRequest.get<ApiResponse>({
        url: DashboardApi.categoryGoodsCount
    })
}

export function getCategoryGoodsSale() {
    return wffRequest.get<ApiResponse>({
        url: DashboardApi.categoryGoodsSale
    })
}

export function getCategoryGoodsFavor() {
    return wffRequest.get<ApiResponse>({
        url: DashboardApi.categoryGoodsFavor
    })
}

export function getAddressGoodsSale() {
    return wffRequest.get<ApiResponse>({
        url: DashboardApi.addressGoodsSale
    })
}
