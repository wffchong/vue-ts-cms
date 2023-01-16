<script setup lang="ts">
import PageSearch from '@/components/PageSearch/index.vue'
import PageContent from '@/components/PageContent/index.vue'
import PageModal from './components/PageModal/index.vue'
import { searchConfig, contentConfig } from './config'

export interface SearchForm {
	name: string
	leader: string
	createAt: string
}

const contentRef = ref<InstanceType<typeof PageContent>>()
const modalRef = ref<InstanceType<typeof PageModal>>()

const handleQueryClick = (searchForm: SearchForm) => {
	contentRef.value?.fetchPageList(searchForm)
}

const handleResetClick = () => {
	contentRef.value?.fetchPageList()
}

const handleNewPageClick = () => {
	if (modalRef.value) modalRef.value.setModalVisible()
}

const handleEditUserClick = (itemData: any) => {
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
			@edit-click="handleEditUserClick"
		/>
		<page-modal ref="modalRef" />
	</div>
</template>

<style scoped lang="less">
.department {
	border-radius: 8px;
	overflow: hidden;
}
</style>
