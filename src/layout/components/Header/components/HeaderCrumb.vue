<script setup lang="ts">
import { useLoginStore } from '@/store/modules/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menu'

const loginStore = useLoginStore()
const route = useRoute()
const breadcrumbs = computed(() => mapPathToBreadcrumbs(route.path, loginStore.userMenus))
</script>

<template>
	<div class="header-crumb">
		<el-breadcrumb separator="/">
			<template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.path">
				<el-breadcrumb-item :to="breadcrumb.path">{{ breadcrumb.name }}</el-breadcrumb-item>
			</template>
		</el-breadcrumb>
	</div>
</template>

<style scoped lang="less">
.header-crumb {
	color: red;
}
</style>
