<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/store'
import { useCommonStore } from '@/store/modules/common'

const globalStore = useGlobalStore()
const commonStore = useCommonStore()
const { entireDepartments } = storeToRefs(globalStore)

const centerDialogVisible = ref(false)
const formData = reactive<any>({
	name: '',
	leader: '',
	parentId: ''
})
const isNewRef = ref(true)
const editData = ref()

const handleConfirm = () => {
	centerDialogVisible.value = false

	if (!isNewRef.value && editData.value) {
		commonStore.editPageDataAction('department', editData.value.id, formData)
	} else {
		commonStore.newPageDataAction('department', formData)
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
					<el-form-item label="部门名称" prop="name">
						<el-input v-model="formData.name" placeholder="请输入用户名" />
					</el-form-item>
					<el-form-item label="部门领导" prop="leader">
						<el-input v-model="formData.leader" placeholder="请输入真实姓名" />
					</el-form-item>
					<el-form-item label="选择部门" prop="parentId">
						<el-select v-model="formData.parentId" placeholder="请选择部门" style="width: 100%">
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
