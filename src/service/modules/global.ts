import { httpRequest } from '@/service'
import type { Global } from '../interface'

// 获取部门列表
export const getDepartmentList = () => {
	return httpRequest.post<Global.ResDepartmentListType>({
		url: '/department/list'
	})
}

// 获取角色列表
export const getRoleList = () => {
	return httpRequest.post<Global.ResRoleListType>({
		url: '/role/list'
	})
}
