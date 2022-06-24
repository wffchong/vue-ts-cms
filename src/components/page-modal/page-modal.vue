<template>
    <el-dialog v-model="centerDialogVisible" title="新建用户" width="30%" center destroy-on-close>
        <wff-form v-bind="modalConfig" v-model="formData"></wff-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleConfirmClick">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import WffForm from '@/baseUi/form/form.vue'
import store from '@/store'

export default defineComponent({
    components: {
        WffForm
    },
    props: {
        modalConfig: {
            type: Object,
            required: true
        },
        pageName: {
            type: String,
            required: true
        },
        defaultInfo: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        const centerDialogVisible = ref(false)
        const formData = ref({})

        // 监听defaultValue的变化
        watch(
            () => props.defaultInfo,
            (newValue) => {
                formData.value = newValue
            }
        )

        const handleConfirmClick = () => {
            // 根据defaultInfo判断是新增还是编辑
            if (Object.keys(props.defaultInfo).length) {
                store.dispatch('system/editPageListAction', {
                    pageName: props.pageName,
                    editData: { ...formData.value },
                    id: props.defaultInfo.id
                })
            } else {
                store.dispatch('system/addPageListAction', {
                    pageName: props.pageName,
                    newData: { ...formData.value }
                })
            }
            centerDialogVisible.value = false
        }

        return { centerDialogVisible, formData, handleConfirmClick }
    }
})
</script>

<style lang="less" scoped></style>
