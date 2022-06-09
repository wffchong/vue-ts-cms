<template>
    <div class="nav-header">
        <el-icon class="fold-menu" @click="handleIconClick">
            <Fold v-if="isShowSideMenu" />
            <Expand v-else />
        </el-icon>
    </div>
</template>

<script>
export default {
    emits: ['changIsShowSideMenu'],
    props: {
        isShowSideMenu: Boolean
    },
    setup(props, { emit }) {
        const handleIconClick = () => {
            console.log(1)
            emit('changIsShowSideMenu', !props.isShowSideMenu)
        }

        return {
            handleIconClick
        }
    }
}
</script>

<style lang="less" scoped>
.nav-header {
    .fold-menu {
        font-size: 30px;
        cursor: pointer;
    }
}
</style>
