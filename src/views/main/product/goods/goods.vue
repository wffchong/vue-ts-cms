<template>
    <div class="goods">
        <page-content :contentConfig="contentConfig" pageName="goods">
            <template #image="scope">
                <el-image
                    style="width: 60px; height: 60px"
                    :src="scope.row.imgUrl"
                    :preview-src-list="[scope.row.imgUrl]"
                    preview-teleported
                ></el-image>
            </template>
            <template #oldPrice="scope">{{ '¥' + scope.row.oldPrice }}</template>
            <template #newPrice="scope">{{ '¥' + scope.row.newPrice }}</template>
        </page-content>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content/page-content.vue'
import { contentConfig } from './config/content-config'

export default defineComponent({
    name: 'Goods',
    components: {
        pageContent
    },
    setup() {
        return { contentConfig }
    }
})
</script>

<style scoped></style>
