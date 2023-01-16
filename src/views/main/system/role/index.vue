<script setup lang="ts">
import PageSearch from '@/components/PageSearch/index.vue'
import PageContent from '@/components/PageContent/index.vue'
import PageModal from '@/components/PageModal/index.vue'
import { searchConfig, contentConfig, modalConfig } from './config'
import { useGlobalStore } from '@/store'
import { storeToRefs } from 'pinia'
import { ElTree } from 'element-plus'
import { mapMenuListToIds } from '@/utils/map-menu'
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'

const treeRef = ref<InstanceType<typeof ElTree>>()

const globalStore = useGlobalStore()
const { menuList } = storeToRefs(globalStore)
const otherInfo = ref({})

const newCallBack = () => {
	nextTick(() => {
		treeRef.value?.setCheckedKeys([])
	})
}

const editCallback = (itemData: any) => {
	nextTick(() => {
		const menuIds = mapMenuListToIds(itemData.menuList)
		treeRef.value?.setCheckedKeys(menuIds)
	})
}

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditPageClick, handleNewPageClick } = usePageModal({ newCallBack, editCallback })

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
