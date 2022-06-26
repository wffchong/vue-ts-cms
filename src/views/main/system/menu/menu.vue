<template>
    <div class="menu">
        <page-content ref="pageContentRef" :contentConfig="contentConfig" pageName="menu" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content/page-content.vue'
import { contentConfig } from './config/content-config'

export default defineComponent({
    name: 'WffMenu',
    components: {
        pageContent
    },
    setup() {
        return { contentConfig }
    }
})
</script>

<style scoped></style>
