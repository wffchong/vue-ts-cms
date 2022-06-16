export type FormItemType = 'input' | 'password' | 'select' | 'datepicker'

export interface IForm {
    labelWidth?: string
    formItems: IFormItem[]
    colLayout?: any
    itemLayout?: any
}

export interface IFormItem {
    field: string
    type: FormItemType
    label: string
    placeholder?: string
    options?: { title: string; value: string }[]
    otherOptions?: { startPlaceholder: string; endPlaceholder: string; type: string }
}
