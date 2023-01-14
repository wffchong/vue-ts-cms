<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/store/modules/common'
import { formatUTC } from '@/utils/format-time'
import type { SearchForm } from '../../index.vue'

const emit = defineEmits<{
	(e: 'newPageClick'): void
	(e: 'editClick', itemData: any): void
}>()

// 表格默认数据
const currentPage = ref(1)
const pageSize = ref(10)

const commonStore = useCommonStore()
const { pageList, pageCount } = storeToRefs(commonStore)

const fetchPageList = (searchForm?: SearchForm) => {
	commonStore.getPageListAction('department', {
		offset: (currentPage.value - 1) * 10,
		size: pageSize.value,
		...searchForm
	})
}

const handleCurrentChange = () => {
	fetchPageList()
}

const handleSizeChange = () => {
	fetchPageList()
}

const deleteClick = (id: string) => {
	commonStore.deletePageByIdAction('department', id)
}

const editClick = (itemData: any) => {
	emit('editClick', itemData)
}

const handleNewPage = () => {
	emit('newPageClick')
}

fetchPageList()

defineExpose({ fetchPageList })
</script>

<template>
	<div class="content">
		<div class="header">
			<h3 class="title">部门列表</h3>
			<el-button type="primary" @click="handleNewPage">新建部门</el-button>
		</div>
		<div class="table">
			<el-table :data="pageList" border>
				<el-table-column align="center" type="selection" width="60px" />
				<el-table-column type="index" label="序号" align="center" width="60px"></el-table-column>
				<el-table-column prop="name" label="部门名称" align="center" width="150px"></el-table-column>
				<el-table-column prop="leader" label="部门领导" align="center" width="150px"></el-table-column>
				<el-table-column prop="parentId" label="上级部门" align="center" width="150px"></el-table-column>
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
				:total="pageCount"
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
