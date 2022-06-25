import { IForm } from '@/baseUi/form/type'

export const modalConfig: IForm = {
    formItems: [
        {
            field: 'name',
            type: 'input',
            label: '用户名',
            placeholder: '请输入用户名'
        },
        {
            field: 'intro',
            type: 'input',
            label: '权限介绍',
            placeholder: '请输入权限介绍'
        }
    ],
    colLayout: { span: 24 },
    itemStyle: {}
}
