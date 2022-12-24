<script setup lang="ts">
import type { Login } from '@/service/interface'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useLoginStore } from '@/store/modules/login'
import { localCache } from '@/utils/cache'
import { Constants } from '@/enums/constants'

const loginStore = useLoginStore()
const account = reactive<Login.ReqAccountLoginForm>({
	name: 'coderwhy',
	password: '123456'
})

const accountRules: FormRules = {
	name: [
		{ required: true, message: '账号不能为空', trigger: 'blur' },
		{
			pattern: /^[a-z0-9]{6,20}$/,
			message: '必须是6~20数字或字母组成~',
			trigger: 'blur'
		}
	],
	password: [
		{ required: true, message: '必须输入密码信息~', trigger: 'blur' },
		{
			pattern: /^[a-z0-9]{3,}$/,
			message: '必须是3位以上数字或字母组成',
			trigger: 'blur'
		}
	]
}

const formRef = ref<InstanceType<typeof ElForm>>()

const loginAction = async (isRemember: boolean) => {
	if (!formRef.value) return
	await formRef.value.validate(async valid => {
		if (valid) {
			// 执行登录逻辑
			try {
				await loginStore.loginAccountAction(account)

				if (isRemember) {
					localCache.setCache(Constants.LOGIN_NAME, account.name)
					localCache.setCache(Constants.LOGIN_PASSWORD, account.password)
				} else {
					localCache.removeCache(Constants.LOGIN_NAME)
					localCache.removeCache(Constants.LOGIN_PASSWORD)
				}
			} catch (error) {
				ElMessage.error('账号或者密码错误')
				localCache.removeCache(Constants.LOGIN_NAME)
				localCache.removeCache(Constants.LOGIN_PASSWORD)
			}
		} else {
			ElMessage.error('请输入正确的格式')
		}
	})
}

defineExpose({
	loginAction
})
</script>

<template>
	<div class="login-account">
		<el-form ref="formRef" :model="account" :rules="accountRules" status-icon label-width="60px" size="large">
			<el-form-item label="帐号" prop="name">
				<el-input v-model="account.name" />
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="account.password" show-password />
			</el-form-item>
		</el-form>
	</div>
</template>

<style scoped lang="less">
.login-account {
	color: red;
}
</style>
