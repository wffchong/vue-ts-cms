import { useStore } from '@/store'

export function usePermission(pageName: string, handleName: string): boolean {
    const store = useStore()

    const permissions = store.state.login.permissions

    const verifyPermission = `system:${pageName}:${handleName}`

    // 匹配到了应有的权限返回bool
    return !!permissions.find((item) => item === verifyPermission)
}
