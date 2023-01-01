<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { ElConfigProvider } from 'element-plus'
</script>

<template>
	<div class="app">
		<el-config-provider :locale="zhCn">
			<router-view></router-view>
		</el-config-provider>
	</div>
</template>

<style scoped lang="less">
.app {
	width: 100vw;
	height: 100vh;
}
</style>
