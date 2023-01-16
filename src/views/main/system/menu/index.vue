<script setup lang="ts">
import PageContent from '@/components/PageContent/index.vue'
import { contentConfig } from './config'
</script>

<template>
	<div class="menu">
		<page-content :content-config="contentConfig"></page-content>
	</div>
</template>

<style scoped lang="less"></style>
