import { httpRequest } from '..'

// 通用的请求
export const getPageList = (pageName: string, info: any) => {
	return httpRequest.post({
		url: `/${pageName}/list`,
		data: info
	})
}

export const deletePageById = (pageName: string, id: string) => {
	return httpRequest.delete({
		url: `/${pageName}/${id}`
	})
}

export const addPage = (pageName: string, info: any) => {
	return httpRequest.post({
		url: `/${pageName}`,
		data: info
	})
}

export const editPage = (pageName: string, id: string, info: any) => {
	return httpRequest.patch({
		url: `/${pageName}/${id}`,
		data: info
	})
}
