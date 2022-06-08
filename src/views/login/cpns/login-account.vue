<template>
    <el-form :model="account" :rules="rules" ref="formRef">
        <el-form-item label="账号" prop="name">
            <el-input v-model="account.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="account.password" type="password" show-password></el-input>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, ref, reactive } from 'vue'
import { rules } from '../config/account-config'
import { useStore } from 'vuex'
import localCache from '@/utils/localCache'

export default defineComponent({
    setup() {
        const store = useStore()

        const account = reactive({
            name: localCache.getCache('name') ?? '',
            password: localCache.getCache('password') ?? ''
        })

        const formRef = ref<InstanceType<typeof ElForm>>()

        const loginAction = (isKeepPassword: boolean) => {
            formRef.value?.validate((valid) => {
                if (isKeepPassword) {
                    localCache.setCache('name', account.name)
                    localCache.setCache('password', account.password)
                } else {
                    localCache.removeCache('name')
                    localCache.removeCache('password')
                }

                if (valid) {
                    store.dispatch('login/accountLoginAction', { ...account })
                }
            })
        }

        return {
            account,
            rules,
            loginAction,
            formRef
        }
    }
})
</script>

<style lang="less" scoped></style>
