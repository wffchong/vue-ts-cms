import type PageModal from '@/components/PageModal/index.vue'

interface Params {
	newCallBack?: () => void
	editCallback?: (data: any) => void
}

export const usePageModal = ({ newCallBack, editCallback }: Params) => {
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
