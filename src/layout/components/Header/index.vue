<script setup lang="ts">
import HeaderCrumb from './components/HeaderCrumb.vue'
import HeaderInfo from './components/HeaderInfo.vue'

const props = defineProps<{
	isFold: boolean
}>()

const emit = defineEmits<{
	(e: 'changeIsFold', bool: boolean): void
}>()

const clickIcon = () => {
	emit('changeIsFold', !props.isFold)
}
</script>

<template>
	<div class="main-header">
		<div class="menu-icon" @click="clickIcon">
			<el-icon size="28px">
				<component :is="isFold ? 'Expand' : 'Fold'" />
			</el-icon>
		</div>
		<div class="content">
			<header-crumb />
			<header-info />
		</div>
	</div>
</template>

<style scoped lang="less">
.main-header {
	display: flex;
	align-items: center;
	flex: 1;
	height: 100%;

	.menu-icon {
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		padding: 0 18px;
	}
}
</style>
