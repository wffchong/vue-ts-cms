<template>
    <div class="page-search">
        <wff-form v-bind="searchFormConfig" v-model="formData">
            <template #header>
                <h1 class="header">高级检索</h1>
            </template>
            <template #footer>
                <div class="handle-btns">
                    <el-button icon="refresh" @click="handleReset">重置</el-button>
                    <el-button type="primary" icon="search" @click="handleQuery">搜索</el-button>
                </div>
            </template>
        </wff-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import WffForm from '@/baseUi/form/form.vue'

export default defineComponent({
    components: {
        WffForm
    },
    props: {
        searchFormConfig: {
            type: Object,
            required: true
        }
    },
    setup(props, { emit }) {
        // 拿到配置中的formItems
        const formItems = props.searchFormConfig.formItems ?? []

        // 定义一个初始的
        const formOriginData: any = {}

        // formOriginData遍历添加属性
        for (const item of formItems) {
            formOriginData[item.field] = ''
        }

        const formData = ref(formOriginData)

        const handleReset = () => {
            formData.value = formOriginData
            emit('clickResetBtn')
        }

        const handleQuery = () => {
            emit('clickQueryBtn', formData.value)
        }

        return {
            formData,
            handleReset,
            handleQuery
        }
    }
})
</script>

<style lang="less" scoped>
.header {
    color: red;
}
.handle-btns {
    text-align: right;
    padding: 0 50px 20px 0;
}
</style>
