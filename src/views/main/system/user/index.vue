<script setup lang="ts">
import UserSearch from './components/UserSearch/index.vue'
import UserContent from './components/UserContent/index.vue'

export interface SearchForm {
	name: string
	realname: string
	cellphone: string
	enable: number
	createAt: string
}

const contentRef = ref<InstanceType<typeof UserContent>>()

const handleQueryClick = (searchForm: SearchForm) => {
	contentRef.value?.fetchUserList(searchForm)
}

const handleResetClick = () => {
	contentRef.value?.fetchUserList()
}
</script>

<template>
	<div class="user">
		<user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
		<user-content ref="contentRef" />
	</div>
</template>

<style scoped lang="less">
.user {
	border-radius: 8px;
	overflow: hidden;
}
</style>
