<script setup lang="ts">
import Menu from './components/Menu/index.vue'
import Header from './components/Header/index.vue'
import Main from './components/Main/index.vue'

const isFold = ref(false)

const changeIsFold = (bool: boolean) => {
	isFold.value = bool
}
</script>

<template>
	<div class="layout">
		<el-container class="layout-container">
			<el-aside :width="isFold ? '60px' : '210px'" class="el-aside">
				<Menu :isFold="isFold" />
			</el-aside>
			<el-container>
				<el-header>
					<Header :isFold="isFold" @changeIsFold="changeIsFold" />
				</el-header>
				<el-main class="el-main">
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
		.el-aside {
			overflow-x: hidden;
			overflow-y: auto;
			line-height: 200px;
			text-align: left;
			cursor: pointer;
			background-color: #001529;
			scrollbar-width: none; /* firefox */
			-ms-overflow-style: none; /* IE 10+ */

			transition: width 0.3s ease;

			&::-webkit-scrollbar {
				display: none;
			}
		}
		.el-main {
			background-color: #f0f2f5;
		}
	}
}
</style>
