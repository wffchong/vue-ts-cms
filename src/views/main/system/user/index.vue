<script setup lang="ts">
import UserSearch from './components/UserSearch/index.vue'
import UserContent from './components/UserContent/index.vue'
import UserModal from './components/UserModal/index.vue'

export interface SearchForm {
	name: string
	realname: string
	cellphone: string
	enable: number | string
	createAt: string
}

const contentRef = ref<InstanceType<typeof UserContent>>()
const modalRef = ref<InstanceType<typeof UserModal>>()

const handleQueryClick = (searchForm: SearchForm) => {
	contentRef.value?.fetchUserList(searchForm)
}

const handleResetClick = () => {
	contentRef.value?.fetchUserList()
}

const handleNewUserClick = () => {
	if (modalRef.value) modalRef.value.centerDialogVisible = true
}
</script>

<template>
	<div class="user">
		<user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
		<user-content ref="contentRef" @new-user-click="handleNewUserClick" />
		<user-modal ref="modalRef" />
	</div>
</template>

<style scoped lang="less">
.user {
	border-radius: 8px;
	overflow: hidden;
}
</style>
