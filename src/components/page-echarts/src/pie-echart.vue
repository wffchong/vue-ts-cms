<script setup lang="ts">
import { computed } from 'vue'
import BaseEchart from '@/baseUi/echart/base-echart.vue'
import { IDataType } from '../types'

const props = defineProps<{
    pieData: IDataType[]
}>()

const options = computed(() => {
    return {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            left: 'left'
        },
        series: [
            {
                name: '分类数据',
                type: 'pie',
                radius: '50%',
                data: props.pieData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
})
</script>

<template>
    <div class="pie-echart">
        <base-echart :options="options" />
        <template v-for="item in pieData" :key="item.name">
            <span>{{ item.value }}</span>
        </template>
    </div>
</template>

<style lang="less" scoped></style>
