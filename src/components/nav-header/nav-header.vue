<template>
    <div class="nav-header">
        <el-icon class="fold-menu" @click="handleIconClick">
            <Fold v-if="isShowSideMenu" />
            <Expand v-else />
        </el-icon>
        <div class="content">
            <breadcrumb :breadcrumbs="breadcrumbs"></breadcrumb>
            <user-info />
        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import UserInfo from './user-info.vue'
import Breadcrumb from '@/baseUi/breadcrumb/breadcrumb.vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
export default defineComponent({
    components: {
        UserInfo,
        Breadcrumb
    },
    props: {
        isShowSideMenu: Boolean
    },
    emits: ['changIsShowSideMenu'],
    setup(props, { emit }) {
        const handleIconClick = () => {
            emit('changIsShowSideMenu', !props.isShowSideMenu)
        }

        // 面包屑数据
        const store = useStore()
        const route = useRoute()
        const userMenus = store.state.login.userMenus

        const breadcrumbs = computed(() => {
            const currentPath = route.path
            return pathMapBreadcrumbs(userMenus, currentPath)
        })

        return {
            handleIconClick,
            breadcrumbs
        }
    }
})
</script>

<style lang="less" scoped>
.nav-header {
    display: flex;
    width: 100%;

    .fold-menu {
        font-size: 30px;
        cursor: pointer;
    }

    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;
        padding: 0 20px;
    }
}
</style>
