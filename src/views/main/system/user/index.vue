<script setup lang="ts">
import UserSearch from './components/UserSearch/index.vue'
import UserContent from './components/UserContent/index.vue'
</script>

<template>
	<div class="user">
		<user-search />
		<user-content />
	</div>
</template>

<style scoped lang="less">
.user {
	border-radius: 8px;
	overflow: hidden;
}
</style>
