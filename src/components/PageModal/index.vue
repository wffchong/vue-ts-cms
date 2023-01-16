<script setup lang="ts">
import { useCommonStore } from '@/store/modules/common'

interface IProps {
	modalConfig: {
		pageName: string
		header: {
			newTitle: string
			editTitle: string
		}
		formItems: any[]
	}
}

const props = defineProps<IProps>()

const commonStore = useCommonStore()

const centerDialogVisible = ref(false)
const initialForm: Record<string, any> = {}
for (const item of props.modalConfig.formItems) {
	initialForm[item.prop] = item.initialValue ?? ''
}

const formData = reactive(initialForm)
const isNewRef = ref(true)
const editData = ref()

const handleConfirm = () => {
	centerDialogVisible.value = false

	if (!isNewRef.value && editData.value) {
		commonStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, formData)
	} else {
		commonStore.newPageDataAction(props.modalConfig.pageName, formData)
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
			const item = props.modalConfig.formItems.find(item => item.prop === key)
			formData[key] = item ? item.initialValue : ''
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
			:title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
			width="30%"
			center
			destroy-on-close
			:close-on-click-modal="false"
		>
			<div class="form">
				<el-form :model="formData" label-width="80px" size="large">
					<template v-for="(item, index) in modalConfig.formItems" :key="index">
						<el-form-item :label="item.label" :prop="item.prop">
							<template v-if="item.type === 'input'">
								<el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
							</template>
							<template v-if="item.type === 'select'">
								<el-select
									v-model="formData[item.prop]"
									:placeholder="item.placeholder"
									style="width: 100%"
								>
									<template v-for="option in item.options" :key="option.value">
										<el-option :label="option.label" :value="option.value" />
									</template>
								</el-select>
							</template>
							<template v-if="item.type === 'date-picker'">
								<el-date-picker
									v-model="formData[item.prop]"
									type="daterange"
									range-separator="-"
									start-placeholder="开始时间"
									end-placeholder="结束时间"
								/>
							</template>
							<template v-if="item.type === 'custom'">
								<slot :name="item.slotName"></slot>
							</template>
						</el-form-item>
					</template>
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
