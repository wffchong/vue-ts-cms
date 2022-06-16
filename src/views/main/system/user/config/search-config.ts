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
            type: 'password',
            field: 'password',
            label: '密码',
            placeholder: '请输入密码'
        },
        {
            type: 'select',
            field: 'sport',
            label: '喜欢的运动',
            placeholder: '请选择喜欢的运动',
            options: [
                { title: '篮球', value: 'basketball' },
                { title: '足球', value: 'football' }
            ]
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
