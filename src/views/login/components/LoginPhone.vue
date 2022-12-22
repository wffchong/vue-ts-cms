<script setup lang="ts">
import type { Login } from '@/service/interface'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'

const phone = reactive<Login.ReqPhoneLoginForm>({
	phone: '',
	verifyCode: ''
})

const phoneRules: FormRules = {
	phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
	verifyCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
}

const formRef = ref<InstanceType<typeof ElForm>>()

const loginAction = async () => {
	if (!formRef.value) return
	await formRef.value.validate(valid => {
		if (valid) {
			// 执行登录逻辑
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
	<div class="login-phone">
		<el-form ref="formRef" :model="phone" :rules="phoneRules" status-icon label-width="70px" size="large">
			<el-form-item label="手机号" prop="phone">
				<el-input v-model="phone.phone" />
			</el-form-item>
			<el-form-item label="验证码" prop="verifyCode">
				<div class="verify-code">
					<el-input v-model="phone.verifyCode" />
					<el-button class="get-btn" type="primary">获取验证码</el-button>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<style scoped lang="less">
.panel-phone {
	color: red;
}

.verify-code {
	display: flex;

	.get-btn {
		margin-left: 8px;
	}
}
</style>
