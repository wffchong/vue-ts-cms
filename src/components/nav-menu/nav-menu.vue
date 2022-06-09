<template>
    <div class="nav-menu">
        <div class="logo">
            <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
            <span class="title" v-if="!isShowSideMenu">Vue3+Ts</span>
        </div>
        <el-menu
            default-active="2"
            :collapse="isShowSideMenu"
            class="el-menu-vertical"
            background-color="#0c2135"
            text-color="#b7bdc3"
            active-text-color="#0a60bd"
        >
            <el-sub-menu v-for="item in userMenus" :key="item.id" :index="item.id + ''">
                <!-- 标题 -->
                <template #title>
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </template>

                <!-- 子菜单 -->
                <template v-if="item.children">
                    <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.id + ''">
                        {{ subItem.name }}
                    </el-menu-item>
                </template>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from '@/store'
export default {
    props: {
        isShowSideMenu: Boolean
    },
    setup() {
        const store = useStore()

        // 处理字体图标，element-plus更新了需要处理下
        const userMenus = computed(() =>
            store.state.login.userMenus.map((item) => {
                return { ...item, icon: item.icon.slice(8) }
            })
        )

        return {
            userMenus
        }
    }
}
</script>

<style lang="less" scoped>
.nav-menu {
    height: 100%;
    background-color: #001529;

    .logo {
        display: flex;
        height: 28px;
        padding: 12px 10px 8px 10px;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        .img {
            height: 100%;
            margin: 0 10px;
        }

        .title {
            font-size: 16px;
            font-weight: 700;
            color: white;
        }
    }

    .el-menu {
        border-right: none;
    }

    // 目录
    .el-submenu {
        background-color: #001529 !important;
        // 二级菜单 ( 默认背景 )
        .el-menu-item {
            padding-left: 50px !important;
            background-color: #0c2135 !important;
        }
    }

    ::v-deep .el-submenu__title {
        background-color: #001529 !important;
    }

    // hover 高亮
    .el-menu-item:hover {
        color: #fff !important; // 菜单
    }

    .el-menu-item.is-active {
        color: #fff !important;
        background-color: #0a60bd !important;
    }
}

.el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
    height: calc(100% - 48px);
}
</style>
