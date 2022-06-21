<template>
    <div class="menu">
        <page-content :contentConfig="contentConfig" pageName="menu" ref="pageContentRef" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content/page-content.vue'
import { contentConfig } from './config/content-config'

export default defineComponent({
    name: 'wff-menu',
    components: {
        pageContent
    },
    setup() {
        return { contentConfig }
    }
})
</script>

<style scoped></style>
