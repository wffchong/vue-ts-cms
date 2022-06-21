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
        <el-table :data="listData" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column v-if="isShowIndex" type="selection" width="50" align="center"></el-table-column>
            <el-table-column
                v-if="isShowSelection"
                type="index"
                label="序号"
                align="center"
                width="80"
            ></el-table-column>
            <el-table-column
                v-for="propItem in propList"
                :key="propItem.prop"
                :label="propItem.label"
                :min-width="propItem.minWidth"
                align="center"
                show-overflow-tooltip
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
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400"
                >
                </el-pagination>
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
        }
    },
    setup() {
        const handleSelectionChange = (tableList: IUserList[]) => {
            console.log(tableList)
        }

        const handleSizeChange = (val: number) => {
            console.log(`${val} items per page`)
        }

        const handleCurrentChange = (val: number) => {
            console.log(`current page: ${val}`)
        }

        return {
            handleSelectionChange,
            handleSizeChange,
            handleCurrentChange
        }
    }
})
</script>

<style lang="less" scoped>
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

.footer {
    margin-top: 15px;

    .el-pagination {
        justify-content: flex-end;
        text-align: right;
    }
}
</style>
