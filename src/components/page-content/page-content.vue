<template>
    <div class="page-content">
        <wff-table :listData="dataList" v-bind="contentConfig">
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
        </wff-table>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
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
        }
    },
    setup() {
        const store = useStore()

        store.dispatch('system/getPageListAction', {
            pageUrl: '/users/list',
            queryInfo: {
                offset: 0,
                size: 10
            }
        })

        const dataList = computed(() => store.state.system.userList)

        return { dataList }
    }
})
</script>

<style lang="less" scoped>
.page-content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
}
</style>
