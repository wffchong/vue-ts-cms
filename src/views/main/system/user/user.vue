<template>
    <div class="user">
        <page-search
            :searchFormConfig="searchFormConfig"
            @clickQueryBtn="handleQueryClick"
            @clickResetBtn="handleResetClick"
        />
        <page-content
            ref="pageContentRef"
            :contentConfig="contentConfig"
            pageName="users"
            @clickNewBtn="handleNewData"
            @clickEditBtn="handleEditData"
        />
        <page-modal ref="pageModalRef" :modalConfig="modalConfigRef" :defaultInfo="defaultInfo" pageName="users" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import { searchFormConfig } from './config/search-config'
import { contentConfig } from './config/content-config'
import { modalConfig } from './config/modal-config'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'

export default defineComponent({
    name: 'User',
    components: {
        PageSearch,
        PageContent,
        PageModal
    },
    setup() {
        const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()

        // 处理密码框的显示与隐藏
        const newCallBack = () => {
            const passwordItem = modalConfig.formItems.find((item) => item.field === 'password')
            passwordItem!.isHidden = false
        }

        const editCallBack = () => {
            const passwordItem = modalConfig.formItems.find((item) => item.field === 'password')
            passwordItem!.isHidden = true
        }

        const [defaultInfo, handleNewData, handleEditData, pageModalRef] = usePageModal(newCallBack, editCallBack)

        // 动态添加部门数据和角色数据
        const store = useStore()

        // 这里数据虽然是从vuex里面拿的，vuex里面获取的是响应式数据，前提是要被template引用或者计算属性等引用
        const modalConfigRef = computed(() => {
            // 找到department这项
            const departmentItem = modalConfig.formItems.find((item) => item.field === 'departmentId')
            departmentItem!.options = store.state.entireDepartment.map((item) => {
                return { title: item.name, value: item.id }
            })

            // 找到role这项
            const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
            roleItem!.options = store.state.entireDepartment.map((item) => {
                return { title: item.name, value: item.id }
            })

            // 把修改好了的返回出去
            return modalConfig
        })

        return {
            searchFormConfig,
            contentConfig,
            modalConfigRef,
            pageContentRef,
            handleQueryClick,
            handleResetClick,
            handleNewData,
            handleEditData,
            pageModalRef,
            defaultInfo
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
