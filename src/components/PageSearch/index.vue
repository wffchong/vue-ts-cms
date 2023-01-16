<script setup lang="ts">
import usePermissions from '@/hooks/usePermissions'
import { ElForm } from 'element-plus'

interface IProps {
	searchConfig: {
		labelWidth?: string
		formItems: any[]
		pageName: string
	}
}

const props = defineProps<IProps>()

const emit = defineEmits<{
	(e: 'queryClick', searchForm: any): void
	(e: 'resetClick'): void
}>()

const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)

const formRef = ref<InstanceType<typeof ElForm>>()

const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
	initialForm[item.prop] = item.initialValue ?? ''
}

const searchForm = reactive(initialForm)

const handleReset = () => {
	formRef.value?.resetFields()
	emit('resetClick')
}

const handleSearch = () => {
	emit('queryClick', searchForm)
}
</script>

<template>
	<div class="search" v-if="isQuery">
		<el-form label-width="80px" size="large" :model="searchForm" ref="formRef">
			<el-row :gutter="20">
				<template v-for="item in searchConfig.formItems" :key="item.prop">
					<el-col :span="8">
						<el-form-item :label="item.label" :prop="item.prop">
							<template v-if="item.type === 'input'">
								<el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
							</template>
							<template v-if="item.type === 'date-picker'">
								<el-date-picker
									v-model="searchForm[item.prop]"
									type="daterange"
									range-separator="-"
									start-placeholder="开始时间"
									end-placeholder="结束时间"
								/>
							</template>
							<template v-if="item.type === 'select'">
								<el-select
									v-model="searchForm[item.prop]"
									:placeholder="item.placeholder"
									style="width: 100%"
								>
									<template v-for="option in item.options" :key="option.value">
										<el-option :label="option.label" :value="option.value" />
									</template>
								</el-select>
							</template>
						</el-form-item>
					</el-col>
				</template>
			</el-row>
		</el-form>
		<div class="btns">
			<el-button icon="Refresh" @click="handleReset">重置</el-button>
			<el-button icon="Search" type="primary" @click="handleSearch">查询</el-button>
		</div>
	</div>
</template>

<style scoped lang="less">
.search {
	background-color: #fff;
	padding: 20px;

	.el-form-item {
		padding: 20px 30px;
		margin-bottom: 0;
	}
	.btns {
		text-align: right;
		padding: 0 50px 10px 0;

		.el-button {
			height: 36px;
		}
	}
}
</style>
