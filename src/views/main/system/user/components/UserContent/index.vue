<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'

// 表格默认数据s
const currentPage = ref(1)
const pageSize = ref(10)

const userStore = useUserStore()
const { userList, totalCount } = storeToRefs(userStore)

const fetchUserList = () => {
	userStore.getUserListAction({
		offset: currentPage.value - 1,
		size: pageSize.value
	})
}

const handleCurrentChange = () => {
	fetchUserList()
}

const handleSizeChange = () => {
	fetchUserList()
}

fetchUserList()
</script>

<template>
	<div class="content">
		<div class="header">
			<h3 class="title">用户列表</h3>
			<el-button type="primary">新建用户</el-button>
		</div>
		<div class="table">
			<el-table :data="userList" border>
				<el-table-column align="center" type="selection" width="60px" />
				<el-table-column type="index" label="序号" align="center" width="60px"></el-table-column>
				<el-table-column prop="name" label="用户名" align="center" width="150px"></el-table-column>
				<el-table-column prop="realname" label="真实姓名" align="center" width="150px"></el-table-column>
				<el-table-column prop="cellphone" label="手机号码" align="center" width="150px"></el-table-column>
				<el-table-column prop="enable" label="状态" align="center" width="100px"></el-table-column>
				<el-table-column prop="createAt" label="创建时间" align="center"></el-table-column>
				<el-table-column prop="updateAt" label="更新时间" align="center"></el-table-column>
				<el-table-column label="操作" align="center" width="150px"></el-table-column>
			</el-table>
		</div>
		<div class="pagination">
			<el-pagination
				v-model:current-page="currentPage"
				v-model:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalCount"
				:page-sizes="[5, 10, 15, 20]"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
			/>
		</div>
	</div>
</template>

<style scoped lang="less">
.content {
	margin-top: 20px;
	padding: 20px;
	background-color: #fff;
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;

		.title {
			font-size: 22px;
		}
	}
	.pagination {
		display: flex;
		justify-content: flex-end;
		margin-top: 10px;
	}
}
</style>
