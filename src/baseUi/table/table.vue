<template>
    <div class="wff-table">
        <div class="header">
            <slot name="header">
                <div class="title">{{ title }}</div>
                <div class="handler">
                    <slot name="headerHandler"></slot>
                </div>
            </slot>
        </div>
        <el-table
            :data="listData"
            border
            style="width: 100%"
            v-bind="childrenProps"
            @selection-change="handleSelectionChange"
        >
            <el-table-column v-if="isShowSelection" type="selection" width="60" align="center"></el-table-column>
            <el-table-column v-if="isShowIndex" type="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column
                v-for="propItem in propList"
                :key="propItem.prop"
                :label="propItem.label"
                :min-width="propItem.minWidth"
                align="center"
                show-overflow-tooltip
                class-name="table-column"
            >
                <template #default="scope">
                    <slot :name="propItem.slotName" :row="scope.row">
                        {{ scope.row[propItem.prop] }}
                    </slot>
                </template>
            </el-table-column>
        </el-table>
        <div class="footer">
            <slot name="footer">
                <template v-if="showFooter">
                    <el-pagination
                        :current-page="page.currentPage + 1"
                        :page-sizes="[10, 20, 30]"
                        :page-size="page.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="listCount"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                    >
                    </el-pagination>
                </template>
            </slot>
        </div>
    </div>
</template>

<script lang="ts">
import { IUserList } from '@/service/main/system/type'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        listData: {
            type: Array as PropType<IUserList[]>,
            required: true
        },
        propList: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            default: ''
        },
        isShowIndex: {
            type: Boolean,
            default: true
        },
        isShowSelection: {
            type: Boolean,
            default: true
        },
        page: {
            type: Object,
            default: () => ({ currentPage: 0, pageSize: 10 })
        },
        listCount: {
            type: Number,
            default: 0
        },
        showFooter: {
            type: Boolean,
            default: true
        },
        childrenProps: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ['update:page'],
    setup(props, { emit }) {
        const handleSelectionChange = (tableList: IUserList[]) => {
            console.log(tableList)
        }

        const handleSizeChange = (val: number) => {
            emit('update:page', { ...props.page, pageSize: val })
        }

        const handleCurrentChange = (val: number) => {
            emit('update:page', { ...props.page, currentPage: val - 1 })
        }

        return {
            handleSelectionChange,
            handleSizeChange,
            handleCurrentChange
        }
    }
})
</script>

<style scoped lang="less">
.header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
        font-size: 20px;
        font-weight: 700;
    }

    .handler {
        align-items: center;
    }
}

// 样式穿透
/deep/ .table-column {
    padding: 12px 0 !important;
}

.footer {
    margin-top: 15px;

    .el-pagination {
        justify-content: flex-end;
        text-align: right;
    }
}
</style>
