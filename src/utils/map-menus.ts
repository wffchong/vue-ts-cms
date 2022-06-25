import { RouteRecordRaw } from 'vue-router'
import { IUserMenus } from '@/service/login/type'
import { IBreadcrumb } from '@/baseUi/breadcrumb/type'

let firstMenu: IUserMenus | null = null

export function mapMenusToRoutes(userMenus: IUserMenus[]): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = []

    // 把全部路由拿过来，符合条件的放入routes
    const allRoutes: RouteRecordRaw[] = []

    // 1:先加载所有的路由配置
    const routeFiles = require.context('../router/main', true, /\.ts/)
    routeFiles.keys().forEach((key) => {
        // 这里的key是一个个路径。
        const route = require('../router/main' + key.slice(1))
        allRoutes.push(route.default)
    })
    // console.log(allRoutes)
    // 2:根据传入的菜单，然后和所有配置做匹配，符合条件的push
    // 这里需要判断type是否等一2，如果等于1的话需要继续递归他的孩子，看孩子的type是不是也等于1
    const _recurseGetRoute = (menus: IUserMenus[]) => {
        for (const menu of menus) {
            if (menu.type === 2) {
                const route = allRoutes.find((route) => route.path === menu.url)
                if (route) routes.push(route)
                // 把第一个子菜单设置上去
                if (!firstMenu) firstMenu = menu
            } else if (menu.type === 1 && menu.children) {
                _recurseGetRoute(menu.children)
            }
        }
    }

    _recurseGetRoute(userMenus)

    return routes
}

// export function pathMapToMenu(userMenus: IUserMenus[], currentPath: string): IUserMenus {
//     // 传入所有的菜单和当前路由信息，根据当前路由信息匹配菜单，拿到对应的id

//     let res: IUserMenus | undefined = undefined

//     for (const userMenu of userMenus) {
//         if (userMenu.type === 1) {
//             // 递归
//             const findMenu = pathMapToMenu(userMenu.children ?? [], currentPath)
//             if (findMenu) {
//                 return findMenu
//             }
//         } else if (userMenu.type === 2 && userMenu.url === currentPath) {
//             res = userMenu
//         }
//     }
//     return res as IUserMenus
// }

// export function pathMapToBreadcrumbs(userMenus: IUserMenus[], currentPath: string): IBreadcrumb[] {
//     // 传入所有的菜单和当前路由信息，根据当前路由信息匹配菜单，拿到对应的id

//     const breadcrumbs: IBreadcrumb[] = []

//     for (const userMenu of userMenus) {
//         if (userMenu.type === 1) {
//             // 递归
//             const findMenu = pathMapToMenu(userMenu.children ?? [], currentPath)
//             console.log(findMenu)
//             if (findMenu) {
//                 breadcrumbs.push({ name: userMenu.name, path: userMenu.url })
//                 breadcrumbs.push({ name: findMenu.name, path: findMenu.url })
//                 console.log('1', breadcrumbs)
//                 return breadcrumbs
//             }
//         } else if (userMenu.type === 2 && userMenu.url === currentPath) {
//             return breadcrumbs
//         }
//     }
//     return breadcrumbs
// }

export function pathMapBreadcrumbs(userMenus: IUserMenus[], currentPath: string) {
    const breadcrumbs: IBreadcrumb[] = []
    pathMapToMenu(userMenus, currentPath, breadcrumbs)
    return breadcrumbs
}

// /main/system/role  -> type === 2 对应menu
export function pathMapToMenu(userMenus: IUserMenus[], currentPath: string, breadcrumbs?: IBreadcrumb[]): any {
    for (const menu of userMenus) {
        if (menu.type === 1) {
            const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
            if (findMenu) {
                breadcrumbs?.push({ name: menu.name })
                breadcrumbs?.push({ name: findMenu.name })
                return findMenu
            }
        } else if (menu.type === 2 && menu.url === currentPath) {
            return menu
        }
    }
}

export function mapMenusToPermissions(userMenus: IUserMenus[]) {
    const permissions: string[] = []

    // 递归遍历出type为3的，
    const _recurseGetPermissions = (menus: any[]) => {
        for (const menu of menus) {
            if (menu.type === 1 || menu.type === 2) {
                _recurseGetPermissions(menu.children ?? [])
            } else if (menu.type === 3) {
                permissions.push(menu.permission)
            }
        }
    }

    _recurseGetPermissions(userMenus)

    return permissions
}

// 处理叶子节点
export function menuMapLeafKeys(menuList: any) {
    const leafKeys: number[] = []
    const _recurseGetLeaf = (menus: any) => {
        for (const menu of menus) {
            if (menu.children) {
                _recurseGetLeaf(menu.children)
            } else {
                leafKeys.push(menu.id)
            }
        }
    }
    _recurseGetLeaf(menuList)
    return leafKeys
}

export { firstMenu }
