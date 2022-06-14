<template>
    <div class="user">
        <WFFForm v-bind="searchFormConfig" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WFFForm from '@/baseUi/form/form.vue'
import { searchFormConfig } from './config/search-config'

export default defineComponent({
    name: 'user',
    components: {
        WFFForm
    },
    setup() {
        return {
            searchFormConfig
        }
    }
})
</script>

<style scoped></style>
