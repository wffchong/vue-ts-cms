interface Prop {
	type?: string
	label: string
	width?: string
	align?: string
	prop?: string
	slotName?: string
}

interface Tree {
	rowKey: string
	treeProps: {
		children: string
	}
}

interface ContentConfig {
	pageName: string
	header: {
		title: string
		btnTitle: string
	}
	propList: Prop[]
	childrenTree: Tree
}

const contentConfig: ContentConfig = {
	pageName: 'menu',
	header: {
		title: '菜单列表',
		btnTitle: '新建菜单'
	},
	propList: [
		{ label: '菜单名称', prop: 'name', width: '150px', align: 'center' },
		{ label: '级别', prop: 'type', width: '120px', align: 'center' },
		{ label: '菜单url', prop: 'url', width: '150px', align: 'center' },
		{ label: '菜单icon', prop: 'icon', width: '200px', align: 'center' },
		{ label: '排序', prop: 'sort', width: '120px', align: 'center' },
		{ label: '权限', prop: 'permission', width: '150px', align: 'center' },

		{ type: 'timer', label: '创建时间', prop: 'createAt', width: '160px', align: 'center' },
		{ type: 'timer', label: '更新时间', prop: 'updateAt', width: '160px', align: 'center' },
		{ type: 'handler', label: '操作', width: '150px', align: 'center' }
	],
	childrenTree: {
		rowKey: 'id',
		treeProps: {
			children: 'children'
		}
	}
}

export default contentConfig
