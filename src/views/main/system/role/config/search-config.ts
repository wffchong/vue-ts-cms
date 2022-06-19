import { IForm } from '@/baseUi/form/type'

export const searchFormConfig: IForm = {
    labelWidth: '120px',
    formItems: [
        {
            type: 'input',
            field: 'name',
            label: '角色名称',
            placeholder: '请输入角色名称'
        },
        {
            type: 'input',
            field: 'intro',
            label: '权限介绍',
            placeholder: '请输入权限介绍'
        },
        {
            type: 'datepicker',
            field: 'createTime',
            label: '创建时间',
            otherOptions: {
                startPlaceholder: '开始时间',
                endPlaceholder: '结束时间',
                type: 'daterange'
            }
        }
    ],
    // colLayout: {
    //     span: 8
    // },
    itemLayout: {
        padding: '10px 40px'
    }
}
