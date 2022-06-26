<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useEchart } from './hooks/useEchart'

const props = withDefaults(
    defineProps<{
        width?: string
        height?: string
        options: any
    }>(),
    {
        width: '100%',
        height: '360px'
    }
)

const echartDivRef = ref<HTMLElement>()
onMounted(() => {
    const { setOptions } = useEchart(echartDivRef.value!)

    watchEffect(() => {
        setOptions(props.options)
    })
})
</script>

<template>
    <div class="base-echart">
        <div ref="echartDivRef" :style="{ width, height }"></div>
    </div>
</template>

<style lang="less" scoped></style>
