<script setup lang="ts">
import WffCard from '@/baseUi/card/card.vue'
import { PieEchart, RoseEchart, MapEchart, BarEchart, LineEchart } from '@/components/page-echarts'
import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()

store.dispatch('dashboard/getDashboardDataAction')

const categoryGoodsCount = computed(() => {
    return store.state.dashboard.categoryGoodsCount.map((item) => {
        return { name: item.name, value: item.goodsCount }
    })
})

const categoryGoodsSale = computed(() => {
    const xLabels: string[] = []
    const values: any[] = []
    const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
    for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
    }
    return { xLabels, values }
})

const categoryGoodsFavor = computed(() => {
    const xLabels: string[] = []
    const values: any[] = []
    const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
    for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
    }
    return { xLabels, values }
})
const addressGoodsSale = computed(() => {
    return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
    })
})
</script>

<template>
    <div class="dashboard">
        <el-row :gutter="10">
            <el-col :span="7">
                <wff-card title="分类商品数量(饼图)">
                    <pie-echart :pieData="categoryGoodsCount"></pie-echart>
                </wff-card>
            </el-col>
            <el-col :span="10">
                <wff-card title="不同城市商品销量">
                    <map-echart :mapData="addressGoodsSale"></map-echart>
                </wff-card>
            </el-col>
            <el-col :span="7">
                <wff-card title="分类商品数量(玫瑰图)">
                    <rose-echart :roseData="categoryGoodsCount"></rose-echart>
                </wff-card>
            </el-col>
        </el-row>

        <el-row :gutter="10" class="content-row">
            <el-col :span="12">
                <wff-card title="分类商品的销量">
                    <line-echart v-bind="categoryGoodsSale"></line-echart>
                </wff-card>
            </el-col>
            <el-col :span="12">
                <wff-card title="分类商品的收藏">
                    <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
                </wff-card>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="less" scoped>
.content-row {
    margin-top: 20px;
}
</style>
