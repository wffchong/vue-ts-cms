<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/store'
import { useUserStore } from '@/store/modules/user'

const globalStore = useGlobalStore()
const userStore = useUserStore()
const { entireDepartments, entireRoles } = storeToRefs(globalStore)

const centerDialogVisible = ref(false)
const formData = reactive<any>({
	name: '',
	realname: '',
	password: '',
	cellphone: '',
	roleId: '',
	departmentId: ''
})
const isNewRef = ref(true)
const editData = ref()

const handleConfirm = () => {
	centerDialogVisible.value = false

	if (!isNewRef.value && editData.value) {
		userStore.editUserDataAction(editData.value.id, formData)
	} else {
		userStore.newUserDataAction(formData)
	}
}

const setModalVisible = (isNew: boolean = true, itemData?: any) => {
	centerDialogVisible.value = true
	isNewRef.value = isNew
	if (!isNew && itemData) {
		for (const key in formData) {
			formData[key] = itemData[key]
		}
		editData.value = itemData
	} else {
		for (const key in formData) {
			formData[key] = ''
		}
		editData.value = null
	}
}

defineExpose({
	setModalVisible
})
</script>

<template>
	<div class="modal">
		<el-dialog
			v-model="centerDialogVisible"
			title="新建用户"
			width="30%"
			center
			destroy-on-close
			:close-on-click-modal="false"
		>
			<div class="form">
				<el-form label-width="80px" size="large">
					<el-form-item label="用户名" prop="name">
						<el-input v-model="formData.name" placeholder="请输入用户名" />
					</el-form-item>
					<el-form-item label="真实姓名" prop="realname">
						<el-input v-model="formData.realname" placeholder="请输入真实姓名" />
					</el-form-item>
					<el-form-item label="密码" prop="password" v-if="isNewRef">
						<el-input v-model="formData.password" placeholder="请输入密码" show-password />
					</el-form-item>
					<el-form-item label="手机号码" prop="cellphone">
						<el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
					</el-form-item>
					<el-form-item label="选择角色" prop="roleId">
						<el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
							<template v-for="item in entireRoles" :key="item.id">
								<el-option :label="item.name" :value="item.id" />
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="选择部门" prop="departmentId">
						<el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
							<template v-for="item in entireDepartments" :key="item.id">
								<el-option :label="item.name" :value="item.id" />
							</template>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="centerDialogVisible = false">取消</el-button>
					<el-button type="primary" @click="handleConfirm">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="less">
.modal {
	color: red;
}
</style>
