import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { getPageList, editPage, addPage, deletePageById } from '@/service/modules/common'
import type { CommonState } from '../interface'
import { ElMessage } from 'element-plus'

export const useCommonStore = defineStore({
	id: 'CommonStore',
	state: (): CommonState => ({
		pageList: [],
		pageCount: 0
	}),
	actions: {
		// 通用的数据
		async getPageListAction(pageName: string, queryInfo: any) {
			const { data: pageListResult } = await getPageList(pageName, queryInfo)
			this.pageList = pageListResult.list
			this.pageCount = pageListResult.totalCount
		},
		async deletePageByIdAction(pageName: string, id: string) {
			const res = await deletePageById(pageName, id)
			if (res.code === -1002) {
				ElMessage.error(res.data)
			} else {
				ElMessage.success(res.data)
				this.getPageListAction(pageName, { offset: 0, size: 10 })
			}
		},
		async newPageDataAction(pageName: string, userInfo: any) {
			const newResult = await addPage(pageName, userInfo)
			if (newResult.code === 400) {
				ElMessage.error(newResult.data)
			} else {
				ElMessage.success(newResult.data)
				this.getPageListAction(pageName, { offset: 0, size: 10 })
			}
		},
		async editPageDataAction(pageName: string, id: string, info: any) {
			const editResult = await editPage(pageName, id, info)
			if (editResult.code === -1003) {
				ElMessage.error(editResult.data)
			} else {
				ElMessage.success(editResult.data)
				this.getPageListAction(pageName, { offset: 0, size: 10 })
			}
		}
	},
	persist: piniaPersistConfig('CommonState')
})
