<script setup lang="ts">
import { ElForm } from 'element-plus'
import type { SearchForm } from '../../index.vue'

const emit = defineEmits<{
	(e: 'queryClick', searchForm: SearchForm): void
	(e: 'resetClick'): void
}>()
const formRef = ref<InstanceType<typeof ElForm>>()
const searchForm = reactive<SearchForm>({
	name: '',
	leader: '',
	createAt: ''
})

const handleReset = () => {
	formRef.value?.resetFields()
	emit('resetClick')
}

const handleSearch = () => {
	emit('queryClick', searchForm)
}
</script>

<template>
	<div class="search">
		<el-form label-width="80px" size="large" :model="searchForm" ref="formRef">
			<el-row :gutter="20">
				<el-col :span="8">
					<el-form-item label="部门名称" prop="name">
						<el-input v-model="searchForm.name" placeholder="请输入查询的用户名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="部门领导" prop="leader">
						<el-input v-model="searchForm.leader" placeholder="请输入查询的真实姓名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="创建时间" prop="createAt">
						<el-date-picker
							v-model="searchForm.createAt"
							type="daterange"
							range-separator="-"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							size="large"
						/>
					</el-form-item>
				</el-col>
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
