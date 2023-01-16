import { useLoginStore } from '@/store/modules/login'

const usePermissions = (permissionID: string) => {
	const loginStore = useLoginStore()
	const { userPermissions } = loginStore

	return !!userPermissions.find(item => item.includes(permissionID))
}

export default usePermissions
