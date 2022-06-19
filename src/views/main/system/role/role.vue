<template>
    <div class="user">
        <page-search :searchFormConfig="searchFormConfig" />
        <page-content :contentConfig="contentConfig" pageName="role" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import { searchFormConfig } from './config/search-config'
import { contentConfig } from './config/content-config'

export default defineComponent({
    name: 'role',
    components: {
        PageSearch,
        PageContent
    },
    setup() {
        return {
            searchFormConfig,
            contentConfig
        }
    }
})
</script>

<style lang="less" scoped>
.content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
}
</style>
