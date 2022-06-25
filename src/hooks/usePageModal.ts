import { ref } from 'vue'
import PageModal from '@/components/page-modal/page-modal.vue'

type CallBackFn = (item?: any) => void

export function usePageModal(newCallBack?: CallBackFn, editCallBack?: CallBackFn) {
    const pageModalRef = ref<InstanceType<typeof PageModal>>()

    // 定义一个默认的值，然后在根据是新增还是编辑处理。
    const defaultInfo = ref({})

    // 新增
    const handleNewData = () => {
        defaultInfo.value = {}
        if (pageModalRef.value) {
            pageModalRef.value.centerDialogVisible = true
        }
        newCallBack && newCallBack()
    }

    // 编辑
    const handleEditData = (item: any) => {
        // 把当前点击的传过去
        const params = { ...item }
        // 删除这两个数据，不然服务器报错，无效的token
        delete params.updateAt
        delete params.createAt
        defaultInfo.value = params
        if (pageModalRef.value) {
            pageModalRef.value.centerDialogVisible = true
        }
        editCallBack && editCallBack(item)
    }

    return [defaultInfo, handleNewData, handleEditData, pageModalRef]
}
