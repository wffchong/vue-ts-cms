<script setup lang="ts">
import PageSearch from '@/components/PageSearch/index.vue'
import PageContent from '@/components/PageContent/index.vue'
import PageModal from '@/components/PageModal/index.vue'
import { searchConfig, contentConfig, modalConfig } from './config'
import { useGlobalStore } from '@/store'
import { storeToRefs } from 'pinia'
import { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-menu'

const contentRef = ref<InstanceType<typeof PageContent>>()
const modalRef = ref<InstanceType<typeof PageModal>>()
const treeRef = ref<InstanceType<typeof ElTree>>()

const globalStore = useGlobalStore()
const { menuList } = storeToRefs(globalStore)
const otherInfo = ref({})

const handleQueryClick = (searchForm: any) => {
	contentRef.value?.fetchPageList(searchForm)
}

const handleResetClick = () => {
	contentRef.value?.fetchPageList()
}

const handleNewPageClick = () => {
	if (modalRef.value) modalRef.value.setModalVisible()
	nextTick(() => {
		treeRef.value?.setCheckedKeys([])
	})
}

const handleEditPageClick = (itemData: any) => {
	const ids = mapMenuListToIds(itemData.menuList)
	if (modalRef.value) modalRef.value.setModalVisible(false, itemData)
	nextTick(() => {
		treeRef.value?.setCheckedKeys(ids)
	})
}

const handleElTreeCheck = (data1: any, data2: any) => {
	const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
	otherInfo.value = { menuList }
}
</script>

<template>
	<div class="role">
		<page-search :search-config="searchConfig" @query-click="handleQueryClick" @reset-click="handleResetClick" />
		<page-content
			:content-config="contentConfig"
			ref="contentRef"
			@new-page-click="handleNewPageClick"
			@edit-click="handleEditPageClick"
		/>
		<page-modal :modal-config="modalConfig" :other-info="otherInfo" ref="modalRef">
			<template #menulist>
				<el-tree
					ref="treeRef"
					:data="menuList"
					show-checkbox
					node-key="id"
					:props="{ children: 'children', label: 'name' }"
					highlight-current
					@check="handleElTreeCheck"
				/>
			</template>
		</page-modal>
	</div>
</template>

<style scoped lang="less"></style>
