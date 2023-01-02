<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'
import { formatUTC } from '@/utils/format-time'
import type { SearchForm } from '../../index.vue'

const emit = defineEmits<{
	(e: 'newUserClick'): void
	(e: 'editClick', itemData: any): void
}>()

// 表格默认数据s
const currentPage = ref(1)
const pageSize = ref(10)

const userStore = useUserStore()
const { userList, totalCount } = storeToRefs(userStore)

const fetchUserList = (searchForm?: SearchForm) => {
	userStore.getUserListAction({
		offset: (currentPage.value - 1) * 10,
		size: pageSize.value,
		...searchForm
	})
}

const handleCurrentChange = () => {
	fetchUserList()
}

const handleSizeChange = () => {
	fetchUserList()
}

const deleteClick = (id: string) => {
	userStore.deleteUserByIdAction(id)
}

const editClick = (itemData: any) => {
	emit('editClick', itemData)
}

const handleNewUser = () => {
	emit('newUserClick')
}

fetchUserList()

defineExpose({ fetchUserList })
</script>

<template>
	<div class="content">
		<div class="header">
			<h3 class="title">用户列表</h3>
			<el-button type="primary" @click="handleNewUser">新建用户</el-button>
		</div>
		<div class="table">
			<el-table :data="userList" border>
				<el-table-column align="center" type="selection" width="60px" />
				<el-table-column type="index" label="序号" align="center" width="60px"></el-table-column>
				<el-table-column prop="name" label="用户名" align="center" width="150px"></el-table-column>
				<el-table-column prop="realname" label="真实姓名" align="center" width="150px"></el-table-column>
				<el-table-column prop="cellphone" label="手机号码" align="center" width="150px"></el-table-column>
				<el-table-column prop="enable" label="状态" align="center" width="100px">
					<template #default="scope">
						<el-button size="small" :type="scope.row.enable ? 'primary' : 'danger'" plain>
							{{ scope.row.enable ? '启用' : '禁用' }}
						</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="createAt" label="创建时间" align="center">
					<template #default="scope">
						{{ formatUTC(scope.row.createAt) }}
					</template>
				</el-table-column>
				<el-table-column prop="updateAt" label="更新时间" align="center">
					<template #default="scope">
						{{ formatUTC(scope.row.updateAt) }}
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="150px">
					<template #default="scope">
						<el-button size="small" icon="Edit" type="primary" text @click="editClick(scope.row)">
							编辑
						</el-button>
						<el-popconfirm
							title="你确定要删除吗?"
							confirm-button-text="确定"
							cancel-button-text="取消"
							@confirm="deleteClick(scope.row.id)"
						>
							<template #reference>
								<el-button size="small" icon="Delete" type="danger" text> 删除 </el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
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

	.table {
		:deep(.el-table__cell) {
			padding: 12px 0;
		}

		.el-button {
			margin-left: 0;
			padding: 5px 8px;
		}
	}

	.pagination {
		display: flex;
		justify-content: flex-end;
		margin-top: 10px;
	}
}
</style>
