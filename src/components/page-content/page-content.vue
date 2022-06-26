<template>
    <div class="page-content">
        <wff-table v-bind="contentConfig" v-model:page="pageInfo" :listData="dataList" :listCount="dataListCount">
            <!-- header中的插槽 -->
            <template #headerHandler>
                <el-button v-if="isCreate" type="primary" @click="handleNewClick">新建用户</el-button>
            </template>
            <!-- 列中的插槽 -->
            <template #status="scope">
                <el-button size="small" plain :type="scope.row.enable ? 'success' : 'danger'">
                    {{ scope.row.enable ? '启用' : '禁用' }}
                </el-button>
            </template>
            <template #createAt="scope">
                <span>{{ $filters.format(scope.row.createAt) }}</span>
            </template>
            <template #updateAt="scope">
                <span>{{ $filters.format(scope.row.updateAt) }}</span>
            </template>
            <template #handler="scope">
                <div class="handle-btns">
                    <el-button
                        v-if="isUpdate"
                        icon="edit"
                        size="small"
                        text
                        type="primary"
                        @click="handleEditClick(scope.row)"
                    >
                        编辑
                    </el-button>
                    <el-button
                        v-if="isDelete"
                        icon="delete"
                        size="small"
                        type="primary"
                        text
                        @click="open(scope.row.id)"
                    >
                        删除
                    </el-button>
                </div>
            </template>

            <!-- 动态插槽 -->
            <template v-for="item in otherPropSlots" #[item.slotName]="scope">
                <template v-if="item.slotName">
                    <slot :name="item.slotName" :row="scope.row"></slot>
                </template>
            </template>
        </wff-table>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import WffTable from '@/baseUi/table/table.vue'
import { usePermission } from '@/hooks/usePermission'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/el-message-box.css'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $filters: any
    }
}

export default defineComponent({
    components: {
        WffTable
    },
    props: {
        contentConfig: {
            type: Object,
            required: true
        },
        pageName: {
            type: String,
            required: true
        }
    },
    emits: ['clickNewBtn', 'clickEditBtn'],
    setup(props, { emit }) {
        const store = useStore()

        // 获取用户的权限按钮
        const isCreate = usePermission(props.pageName, 'create')
        const isUpdate = usePermission(props.pageName, 'update')
        const isDelete = usePermission(props.pageName, 'delete')
        const isQuery = usePermission(props.pageName, 'query')

        // 将pageInfo双向绑定到table上
        const pageInfo = ref({ currentPage: 0, pageSize: 10 })

        watch(pageInfo, () => getPageData())

        const getPageData = (queryInfo: any = {}) => {
            if (!isQuery) return
            store.dispatch('system/getPageListAction', {
                pageName: props.pageName,
                queryInfo: {
                    offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
                    size: pageInfo.value.pageSize,
                    ...queryInfo
                }
            })
        }

        getPageData()
        const dataList = computed(() => store.getters[`system/pageListData`](props.pageName))
        const dataListCount = computed(() => store.getters[`system/pageListCount`](props.pageName))

        // 处理插槽
        const otherPropSlots = props.contentConfig?.propList.filter((item: any) => {
            if (item.slotName === 'status') return false
            if (item.slotName === 'createAt') return false
            if (item.slotName === 'updateAt') return false
            if (item.slotName === 'handler') return false
            return true
        })

        // 删除
        const open = (id: number) => {
            ElMessageBox.confirm('你确定删除吗?', 'Warning', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            })
                .then(async () => {
                    const { code, data } = await store.dispatch('system/deletePageListAction', {
                        pageName: props.pageName,
                        id
                    })

                    if (code === -1002) {
                        ElMessage({
                            type: 'error',
                            message: data
                        })
                    } else {
                        store.dispatch('getPageListAction', {
                            pageName: props.pageName,
                            queryInfo: {
                                offset: 0,
                                size: 10
                            }
                        })
                        ElMessage({
                            type: 'success',
                            message: '删除成功'
                        })
                    }
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '取消删除'
                    })
                })
        }

        // 新建
        const handleNewClick = () => {
            emit('clickNewBtn')
        }

        // 编辑
        const handleEditClick = (item: any) => {
            emit('clickEditBtn', item)
        }

        return {
            dataList,
            getPageData,
            pageInfo,
            dataListCount,
            otherPropSlots,
            isCreate,
            isUpdate,
            isDelete,
            open,
            handleNewClick,
            handleEditClick
        }
    }
})
</script>

<style lang="less" scoped>
.page-content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
    .handle-btns {
        .el-button--small {
            padding: 7px 0;
        }
    }
}
</style>
