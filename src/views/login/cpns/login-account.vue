<template>
    <el-form :model="account" :rules="rules" ref="formRef">
        <el-form-item label="账号" prop="username">
            <el-input v-model="account.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="account.password"></el-input>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, ref } from 'vue'
import { reactive } from 'vue'
import { rules } from '../config/account-config'

export default defineComponent({
    setup() {
        const account = reactive({
            username: '',
            password: ''
        })

        const formRef = ref<InstanceType<typeof ElForm>>()

        const loginAction = () => {
            formRef.value?.validate((valid) => {
                if (valid) {
                    console.log('调用登录方法')
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
