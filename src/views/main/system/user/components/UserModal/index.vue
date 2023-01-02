<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/store'

const globalStore = useGlobalStore()
const { entireDepartments, entireRoles } = storeToRefs(globalStore)

const centerDialogVisible = ref(true)
const formData = reactive({
	name: '',
	realname: '',
	password: '',
	cellphone: '',
	roleId: '',
	departmentId: ''
})
</script>

<template>
	<div class="modal">
		<el-dialog v-model="centerDialogVisible" title="新建用户" width="30%" center>
			<div class="form">
				<el-form label-width="80px" size="large">
					<el-form-item label="用户名" prop="name">
						<el-input v-model="formData.name" placeholder="请输入用户名" />
					</el-form-item>
					<el-form-item label="真实姓名" prop="realname">
						<el-input v-model="formData.realname" placeholder="请输入真实姓名" />
					</el-form-item>
					<el-form-item label="密码" prop="password">
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
					<el-button type="primary" @click="centerDialogVisible = false"> 确定 </el-button>
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
