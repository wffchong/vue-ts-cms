<script setup lang="ts">
import LoginPanel from './components/LoginPanel.vue'
</script>

<template>
	<div class="login">
		<login-panel></login-panel>
	</div>
</template>

<style scoped lang="less">
.login {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-image: url('@/assets/images/login-bg.svg');
}
</style>
