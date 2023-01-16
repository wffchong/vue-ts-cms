import type PageModal from '@/components/PageModal/index.vue'

type callBackFn = (data?: Record<string, any>) => void

export const usePageModal = (newCallBack?: callBackFn, editCallback?: callBackFn) => {
	const modalRef = ref<InstanceType<typeof PageModal>>()

	const handleNewPageClick = () => {
		if (modalRef.value) modalRef.value.setModalVisible()
		newCallBack && newCallBack()
	}

	const handleEditPageClick = (itemData: any) => {
		if (modalRef.value) modalRef.value.setModalVisible(false, itemData)
		editCallback && editCallback(itemData)
	}

	return {
		modalRef,
		handleNewPageClick,
		handleEditPageClick
	}
}
