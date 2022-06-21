<template>
    <div class="user">
        <page-search
            :searchFormConfig="searchFormConfig"
            @clickQueryBtn="handleQueryClick"
            @clickResetBtn="handleResetClick"
        />
        <page-content :contentConfig="contentConfig" pageName="users" ref="pageContentRef" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import { searchFormConfig } from './config/search-config'
import { contentConfig } from './config/content-config'
import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
    name: 'user',
    components: {
        PageSearch,
        PageContent
    },
    setup() {
        const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()
        return {
            searchFormConfig,
            contentConfig,
            pageContentRef,
            handleQueryClick,
            handleResetClick
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
