<script setup lang="ts">
import { useLoginStore } from '@/store/modules/login'
const loginStore = useLoginStore()
const { userMenus } = loginStore
</script>

<template>
	<div class="main-menu">
		<div class="logo">
			<img class="img" src="@/assets/vue.svg" alt="" />
			<h2 class="title">后台管理系统</h2>
		</div>
		<div class="menu">
			<el-menu default-active="2" text-color="#b7bdc3" active-text-color="#fff" background-color="#001529">
				<template v-for="menu in userMenus" :key="menu.id">
					<el-sub-menu :index="menu.id + ''">
						<template #title>
							<el-icon><location /></el-icon>
							<span>{{ menu.name }}</span>
						</template>

						<template v-for="subMenu in menu.children" :key="subMenu.id">
							<el-menu-item :index="subMenu.id + ''">{{ subMenu.name }}</el-menu-item>
						</template>
					</el-sub-menu>
				</template>
			</el-menu>
		</div>
	</div>
</template>

<style scoped lang="less">
.main-menu {
	height: 100%;
	background-color: #001529;
	.logo {
		display: flex;
		height: 28px;
		padding: 12px 10px 8px 10px;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		overflow: hidden;

		.img {
			height: 100%;
			margin: 0 10px;
		}

		.title {
			font-size: 16px;
			font-weight: 700;
			color: white;
			white-space: nowrap;
		}
	}
}

.el-menu {
	border-right: none;
	user-select: none;
}

.el-sub-menu {
	.el-menu-item {
		padding-left: 50px !important;
		background-color: #0c2135;
	}

	.el-menu-item:hover {
		color: #fff;
	}

	.el-menu-item.is-active {
		background-color: #0a60bd;
	}
}
</style>
