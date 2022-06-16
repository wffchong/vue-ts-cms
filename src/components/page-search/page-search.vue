<template>
    <div class="page-search">
        <wff-form v-bind="searchFormConfig" v-model="formData">
            <template #header>
                <h1 class="header">高级检索</h1>
            </template>
            <template #footer>
                <div class="handle-btns">
                    <el-button icon="refresh">重置</el-button>
                    <el-button type="primary" icon="search">搜索</el-button>
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
    setup() {
        const formData = ref({
            id: '',
            name: '',
            password: '',
            sport: '',
            createTime: ''
        })

        return {
            formData
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
