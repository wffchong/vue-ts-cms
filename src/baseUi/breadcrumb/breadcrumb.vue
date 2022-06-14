<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb.name">
            {{ breadcrumb.name }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from './type'

export default defineComponent({
    props: {
        breadcrumbs: Array as PropType<IBreadcrumb[]>
    },
    setup() {
        return {}
    }
})
</script>

<style lang="less" scoped></style>
