<template>
    <div class="user-info">
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-avatar
                    size="small"
                    src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                ></el-avatar>
                <span class="user-name">{{ name }}</span>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handleExitLogin">退出登录</el-dropdown-item>
                    <el-dropdown-item divided>用户信息</el-dropdown-item>
                    <el-dropdown-item>系统管理</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import localCache from '@/utils/localCache'
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const store = useStore()

        const name = computed(() => store.state.login.userInfo.name)

        const router = useRouter()

        const handleExitLogin = () => {
            localCache.removeCache('token')
            router.push('/')
        }

        return {
            name,
            handleExitLogin
        }
    }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    .user-name {
        margin-left: 10px;
    }
}
</style>
