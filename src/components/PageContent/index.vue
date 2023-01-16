<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/store/modules/common'
import { formatUTC } from '@/utils/format-time'
import usePermissions from '@/hooks/usePermissions'

interface IProps {
	contentConfig: {
		pageName: string
		header?: {
			title?: string
			btnTitle?: string
		}
		propList: any[]
		childrenTree?: {
			rowKey: string
			treeProps: {
				children: string
			}
		}
	}
}

const props = defineProps<IProps>()

const emit = defineEmits<{
	(e: 'newPageClick'): void
	(e: 'editClick', itemData: any): void
}>()

const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 表格默认数据
const currentPage = ref(1)
const pageSize = ref(10)

const commonStore = useCommonStore()

const { pageList, pageCount } = storeToRefs(commonStore)

const fetchPageList = (searchForm?: any) => {
	if (!isQuery) return
	commonStore.getPageListAction(props.contentConfig.pageName, {
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
	commonStore.deletePageByIdAction(props.contentConfig.pageName, id)
}

const editClick = (itemData: any) => {
	emit('editClick', itemData)
}

const handleNewPage = () => {
	emit('newPageClick')
}

fetchPageList()

onUnmounted(() => {
	pageList.value = []
	pageCount.value = 0
})

defineExpose({ fetchPageList })
</script>

<template>
	<div class="content">
		<div class="header">
			<h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
			<el-button type="primary" @click="handleNewPage" v-if="isCreate">
				{{ contentConfig?.header?.btnTitle ?? '新建数据' }}
			</el-button>
		</div>
		<div class="table">
			<el-table :data="pageList" v-bind="contentConfig.childrenTree" border>
				<template v-for="(item, index) in contentConfig.propList" :key="index">
					<template v-if="item.type === 'timer'">
						<el-table-column v-bind="item">
							<template #default="scope">
								{{ formatUTC(scope.row.createAt) }}
							</template>
						</el-table-column>
					</template>
					<template v-else-if="item.type === 'handler'">
						<el-table-column v-bind="item">
							<template #default="scope">
								<el-button
									v-if="isUpdate"
									size="small"
									icon="Edit"
									type="primary"
									text
									@click="editClick(scope.row)"
								>
									编辑
								</el-button>
								<el-popconfirm
									v-if="isDelete"
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
					</template>
					<!-- 默认插槽里面在放个作用域插槽，这样只需要在配置里面写个slotName,然后再外面使用page-content组件的时候就可以使用自定义的内容了 -->
					<template v-else-if="item.type === 'customer'">
						<el-table-column v-bind="item">
							<template #default="scope">
								<slot :name="item.slotName" v-bind="scope"></slot>
							</template>
						</el-table-column>
					</template>
					<template v-else>
						<el-table-column v-bind="item" />
					</template>
				</template>
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
