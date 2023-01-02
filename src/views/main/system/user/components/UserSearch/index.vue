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
	realname: '',
	cellphone: '',
	enable: 1,
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
					<el-form-item label="用户名" prop="name">
						<el-input v-model="searchForm.name" placeholder="请输入查询的用户名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="真实姓名" prop="realname">
						<el-input v-model="searchForm.realname" placeholder="请输入查询的真实姓名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="手机号码" prop="cellphone">
						<el-input v-model="searchForm.cellphone" placeholder="请输入查询的手机号码"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="状态" prop="enable">
						<el-select v-model="searchForm.enable" style="width: 100%" placeholder="请选择查询的状态">
							<el-option :value="1" label="启用"></el-option>
							<el-option :value="0" label="禁用"></el-option>
						</el-select>
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
