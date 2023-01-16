import type PageModal from '@/components/PageModal/index.vue'

export const usePageModal = () => {
	const modalRef = ref<InstanceType<typeof PageModal>>()

	const handleNewPageClick = () => {
		if (modalRef.value) modalRef.value.setModalVisible()
	}

	const handleEditPageClick = (itemData: any) => {
		if (modalRef.value) modalRef.value.setModalVisible(false, itemData)
	}

	return {
		modalRef,
		handleNewPageClick,
		handleEditPageClick
	}
}
