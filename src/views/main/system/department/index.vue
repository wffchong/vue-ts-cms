<script setup lang="ts">
import PageSearch from '@/components/PageSearch/index.vue'
import PageContent from '@/components/PageContent/index.vue'
import PageModal from '@/components/PageModal/index.vue'
import { searchConfig, contentConfig, modalConfig } from './config'
import { useGlobalStore } from '@/store'

export interface SearchForm {
	name: string
	leader: string
	createAt: string
}

const contentRef = ref<InstanceType<typeof PageContent>>()
const modalRef = ref<InstanceType<typeof PageModal>>()

const modalConfigRef = computed(() => {
	const globalStore = useGlobalStore()

	const departments = globalStore.entireDepartments.map(item => {
		return { label: item.name, value: item.id }
	})

	modalConfig.formItems.forEach((item: any) => {
		if (item.prop === 'parentId') {
			item.options = departments
		}
	})

	return modalConfig
})

const handleQueryClick = (searchForm: SearchForm) => {
	contentRef.value?.fetchPageList(searchForm)
}

const handleResetClick = () => {
	contentRef.value?.fetchPageList()
}

const handleNewPageClick = () => {
	if (modalRef.value) modalRef.value.setModalVisible()
}

const handleEditPageClick = (itemData: any) => {
	if (modalRef.value) modalRef.value.setModalVisible(false, itemData)
}
</script>

<template>
	<div class="department">
		<page-search :search-config="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick" />
		<page-content
			:content-config="contentConfig"
			ref="contentRef"
			@new-page-click="handleNewPageClick"
			@edit-click="handleEditPageClick"
		/>
		<page-modal ref="modalRef" :modal-config="modalConfigRef" />
	</div>
</template>

<style scoped lang="less">
.department {
	border-radius: 8px;
	overflow: hidden;
}
</style>
