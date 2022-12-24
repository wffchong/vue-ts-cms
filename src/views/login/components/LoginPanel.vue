<script setup lang="ts">
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'

const isRemember = ref(false)
const activeTab = ref<'account' | 'phone'>('account')

const loginAccountRef = ref<InstanceType<typeof LoginAccount>>()
const loginPhoneRef = ref<InstanceType<typeof LoginPhone>>()

const rememberPassword = (bool: boolean) => {
	isRemember.value = bool
}

const login = () => {
	activeTab.value === 'account'
		? loginAccountRef.value?.loginAction(isRemember.value)
		: loginPhoneRef.value?.loginAction(isRemember.value)
}
</script>

<template>
	<div class="login-panel">
		<h1 class="title">后台管理系统</h1>
		<div class="tabs">
			<el-tabs v-model="activeTab" stretch type="border-card">
				<el-tab-pane name="account">
					<template #label>
						<div class="label">
							<el-icon><UserFilled /></el-icon>
							<span class="text">帐号登录</span>
						</div>
					</template>
					<login-account ref="loginAccountRef"></login-account>
				</el-tab-pane>
				<el-tab-pane label="手机登录" name="phone">
					<template #label>
						<div class="label">
							<el-icon><Cellphone /></el-icon>
							<span class="text">手机登录</span>
						</div>
					</template>
					<login-phone ref="loginPhoneRef"></login-phone>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="controls">
			<el-checkbox v-model="isRemember" label="记住密码" size="large" @change="rememberPassword(isRemember)" />
			<el-link type="primary">忘记密码</el-link>
		</div>
		<el-button class="login-btn" size="large" type="primary" @click="login">立即登录</el-button>
	</div>
</template>

<style scoped lang="less">
.login-panel {
	width: 330px;
	margin-bottom: 150px;

	.title {
		text-align: center;
		margin-bottom: 15px;
	}

	.label {
		display: flex;
		align-items: center;
		justify-content: center;

		.text {
			margin-left: 5px;
		}
	}

	.controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.login-btn {
		margin-top: 10px;
		width: 100%;
	}
}
</style>
