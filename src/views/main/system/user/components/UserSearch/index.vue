<script setup lang="ts"></script>

<template>
	<div class="search">
		<el-form label-width="80px" size="large">
			<el-row :gutter="20">
				<el-col :span="8">
					<el-form-item label="用户名">
						<el-input placeholder="请输入查询的用户名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="真实姓名">
						<el-input placeholder="请输入查询的真实姓名"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="手机号码">
						<el-input placeholder="请输入查询的手机号码"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="状态">
						<el-select style="width: 100%" placeholder="请选择查询的状态">
							<el-option :value="1">启用</el-option>
							<el-option :value="0">禁用</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="创建时间">
						<el-date-picker
							type="daterange"
							range-separator="To"
							start-placeholder="Start date"
							end-placeholder="End date"
							size="large"
						/>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="btns">
			<el-button icon="Refresh">重置</el-button>
			<el-button icon="Search" type="primary">查询</el-button>
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
