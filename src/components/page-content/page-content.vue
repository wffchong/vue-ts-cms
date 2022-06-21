<template>
    <div class="page-content">
        <wff-table :listData="dataList" :listCount="dataListCount" v-bind="contentConfig" v-model:page="pageInfo">
            <!-- header中的插槽 -->
            <template #headerHandler>
                <el-button type="primary" size="medium">新建用户</el-button>
            </template>
            <!-- 列中的插槽 -->
            <template #status="scope">
                <el-button size="small" plain :type="scope.row.enable ? 'success' : 'danger'">
                    {{ scope.row.enable ? '启用' : '禁用' }}
                </el-button>
            </template>
            <template #createAt="scope">
                <strong>{{ $filters.format(scope.row.createAt) }}</strong>
            </template>
            <template #updateAt="scope">
                <strong>{{ $filters.format(scope.row.updateAt) }}</strong>
            </template>
            <template #handler>
                <div class="handle-btns">
                    <el-button icon="edit" size="mini" type="text">编辑</el-button>
                    <el-button icon="delete" size="mini" type="text">删除</el-button>
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
    setup(props) {
        const store = useStore()

        // 将pageInfo双向绑定到table上
        const pageInfo = ref({ currentPage: 0, pageSize: 10 })

        watch(pageInfo, () => getPageData())

        const getPageData = (queryInfo: any = {}) => {
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

        return { dataList, getPageData, pageInfo, dataListCount, otherPropSlots }
    }
})
</script>

<style lang="less" scoped>
.page-content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
}
</style>
