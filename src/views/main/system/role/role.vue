<template>
    <div class="user">
        <page-search :searchFormConfig="searchFormConfig" />
        <page-content
            :contentConfig="contentConfig"
            pageName="role"
            @clickNewBtn="handleNewData"
            @clickEditBtn="handleEditData"
        />
        <page-modal
            ref="pageModalRef"
            :otherInfo="otherInfo"
            :modalConfig="modalConfig"
            :defaultInfo="defaultInfo"
            pageName="role"
        >
            <div class="menu-tree">
                <el-tree
                    ref="elTree"
                    :data="menus"
                    show-checkbox
                    node-key="id"
                    :props="{ children: 'children', label: 'name' }"
                    @check="check"
                />
            </div>
        </page-modal>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import { searchFormConfig } from './config/search-config'
import { contentConfig } from './config/content-config'
import { modalConfig } from './config/modal-config'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'
import { ElTree } from 'element-plus'
import { menuMapLeafKeys } from '@/utils/map-menus'

export default defineComponent({
    name: 'Role',
    components: {
        PageSearch,
        PageContent,
        PageModal
    },
    setup() {
        // 现在还差编辑回显权限操作
        // 需要拿到当前树组件，然后执行组件的方法setCheckedKeys
        const elTree = ref<InstanceType<typeof ElTree>>()

        // 要处理回显，把当前item的菜单处理
        const editCallBack = (item: any) => {
            const leafKeys = menuMapLeafKeys(item.menuList)
            // 执行到这里的时候还没执行template，所以拿不到组件实例，需要使用nextTick
            nextTick(() => {
                elTree.value?.setCheckedKeys(leafKeys)
            })
        }

        const [defaultInfo, handleNewData, handleEditData, pageModalRef] = usePageModal(undefined, editCallBack)

        const store = useStore()

        // 获取完整的菜单
        const menus = computed(() => store.state.entireMenu)

        // 定义一个初始的条件，下面经过处理后传个pageModal组件，然后发送请求的时候带上
        const otherInfo = ref({})

        // 接受两个参数，第一个参数为当前点击的数据,第二个参数为对象
        // 树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
        const check = (data1: any, data2: any) => {
            // 被选中的节点
            const checkKeys = data2.checkedKeys
            // 半选中状态的
            const halfCheckKys = data2.halfCheckedKeys

            const menuList = [...checkKeys, ...halfCheckKys]

            otherInfo.value = { menuList }
        }

        return {
            searchFormConfig,
            contentConfig,
            modalConfig,
            pageModalRef,
            defaultInfo,
            handleNewData,
            handleEditData,
            menus,
            check,
            otherInfo,
            elTree
        }
    }
})
</script>

<style lang="less" scoped>
.content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
}
.menu-tree {
    margin-left: 25px;
}
</style>
