<script setup lang="ts">
import type { Login } from '@/service/interface'
import { useLoginStore } from '@/store/modules/login'
import { mapPathToMenu } from '@/utils/map-menu'

defineProps<{
	isFold: boolean
}>()

const loginStore = useLoginStore()
const { userMenus } = loginStore
const router = useRouter()
const route = useRoute()

const defaultActive = computed(() => {
	return mapPathToMenu(route.path, userMenus)
})

const handleMenuClick = (subMenu: Login.UserMenu) => {
	router.push(subMenu.url)
}
</script>

<template>
	<div class="main-menu">
		<div class="logo">
			<img class="img" src="@/assets/vue.svg" alt="" />
			<h2 class="title" v-show="!isFold">后台管理系统</h2>
		</div>
		<div class="menu">
			<el-menu
				:default-active="defaultActive + ''"
				text-color="#b7bdc3"
				active-text-color="#fff"
				background-color="#001529"
				:collapse="isFold"
			>
				<template v-for="menu in userMenus" :key="menu.id">
					<el-sub-menu :index="menu.id + ''">
						<template #title>
							<el-icon>
								<component :is="menu.icon.split('el-icon-')[1]"></component>
							</el-icon>
							<span>{{ menu.name }}</span>
						</template>

						<template v-for="subMenu in menu.children" :key="subMenu.id">
							<el-menu-item :index="subMenu.id + ''" @click="handleMenuClick(subMenu)">{{
								subMenu.name
							}}</el-menu-item>
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
