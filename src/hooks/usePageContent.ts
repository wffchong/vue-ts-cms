import type PageContent from '@/components/PageContent/index.vue'

export const usePageContent = () => {
	const contentRef = ref<InstanceType<typeof PageContent>>()

	const handleQueryClick = (searchForm: any) => {
		contentRef.value?.fetchPageList(searchForm)
	}

	const handleResetClick = () => {
		contentRef.value?.fetchPageList()
	}

	return {
		contentRef,
		handleQueryClick,
		handleResetClick
	}
}
