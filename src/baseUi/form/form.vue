<template>
    <div class="wff-form">
        <div class="header">
            <slot name="header"></slot>
        </div>
        <el-form :label-width="labelWidth">
            <el-row>
                <template v-for="formItem in formItems" :key="formItem.label">
                    <el-col v-bind="colLayout">
                        <el-form-item v-if="!formItem.isHidden" :label="formItem.label" :style="itemStyle">
                            <template v-if="formItem.type === 'input' || formItem.type === 'password'">
                                <el-input
                                    :placeholder="formItem.placeholder"
                                    :show-password="formItem.type === 'password'"
                                    v-bind="formItem.otherOptions"
                                    :model-value="modelValue[`${formItem.field}`]"
                                    @update:modelValue="handleValueChange($event, formItem.field)"
                                />
                            </template>
                            <template v-if="formItem.type === 'select'">
                                <el-select
                                    style="width: 100%"
                                    v-bind="formItem.otherOptions"
                                    :model-value="modelValue[`${formItem.field}`]"
                                    @update:modelValue="handleValueChange($event, formItem.field)"
                                >
                                    <el-option v-for="opt in formItem.options" :key="opt.value" :value="opt.value">
                                        {{ opt.title }}
                                    </el-option>
                                </el-select>
                            </template>
                            <template v-if="formItem.type === 'datepicker'">
                                <el-date-picker
                                    v-bind="formItem.otherOptions"
                                    :model-value="modelValue[`${formItem.field}`]"
                                    @update:modelValue="handleValueChange($event, formItem.field)"
                                />
                            </template>
                        </el-form-item>
                    </el-col>
                </template>
            </el-row>
        </el-form>
        <div class="footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { IFormItem } from './type'

export default defineComponent({
    props: {
        modelValue: {
            type: Object,
            required: true
        },
        formItems: {
            type: Array as PropType<IFormItem[]>,
            default: () => []
        },
        labelWidth: {
            type: String,
            default: '100px'
        },
        colLayout: {
            type: Object,
            default: () => ({
                xl: 6, // >1920px 4???
                lg: 8,
                md: 12,
                sm: 24,
                xs: 24
            })
        },
        itemStyle: {
            type: Object,
            default: () => ({
                padding: '10px 40px'
            })
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const formData = ref({ ...props.modelValue })

        // ??????formData,?????????????????????
        // watch(
        //     formData,
        //     (newVal) => {
        //         emit('update:modelValue', newVal)
        //     },
        //     { deep: true }
        // )

        // ?????????????????????????????????????????????????????????????????????,????????????@update:modelValue????????????,??????????????????????????????
        const handleValueChange = (value: any, field: string) => {
            emit('update:modelValue', { ...props.modelValue, [field]: value })
        }

        return {
            formData,
            handleValueChange
        }
    }
})
</script>

<style scoped lang="less">
.wff-form {
    padding-top: 22px;
}
</style>
