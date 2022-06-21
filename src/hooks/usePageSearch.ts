import { ref } from 'vue'
import PageContent from '@/components/page-content/page-content.vue'

export function usePageSearch() {
    // 获取组件实例
    const pageContentRef = ref<InstanceType<typeof PageContent>>()

    const handleResetClick = () => {
        pageContentRef.value?.getPageData()
    }

    const handleQueryClick = (queryInfo: any) => {
        pageContentRef.value?.getPageData(queryInfo)
    }

    return [pageContentRef, handleQueryClick, handleResetClick]
}
