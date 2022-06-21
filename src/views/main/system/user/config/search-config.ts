import { IForm } from '@/baseUi/form/type'

export const searchFormConfig: IForm = {
    labelWidth: '120px',
    formItems: [
        {
            type: 'input',
            field: 'id',
            label: 'id',
            placeholder: '请输入id'
        },
        {
            type: 'input',
            field: 'name',
            label: '用户名',
            placeholder: '请输入用户名'
        },
        {
            type: 'input',
            field: 'realname',
            label: '真实姓名',
            placeholder: '请输入真实姓名'
        },
        {
            type: 'input',
            field: 'cellphone',
            label: '电话号码',
            placeholder: '请输入电话号码'
        },
        {
            field: 'enable',
            type: 'select',
            label: '用户状态',
            placeholder: '请选择用户状态',
            options: [
                { title: '启用', value: 1 },
                { title: '禁用', value: 0 }
            ]
        },
        {
            type: 'datepicker',
            field: 'createAt',
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
