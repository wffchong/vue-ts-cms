<template>
    <ElConfigProvider :locale="locale">
        <router-view />
    </ElConfigProvider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default defineComponent({
    components: {
        ElConfigProvider
    },
    setup() {
        return {
            locale: zhCn
        }
    }
})
</script>

<style lang="less"></style>
