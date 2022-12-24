<script setup lang="ts">
import Menu from './components/Menu/index.vue'
import Header from './components/Header/index.vue'
import Main from './components/Main/index.vue'
</script>

<template>
	<div class="layout">
		<el-container class="layout-container">
			<el-aside width="210px">
				<Menu />
			</el-aside>
			<el-container>
				<el-header>
					<Header />
				</el-header>
				<el-main>
					<Main />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<style scoped lang="less">
.layout {
	height: 100%;
	.layout-container {
		height: 100%;
	}
}
</style>
