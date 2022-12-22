import { ConfigEnv, defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// element-plus 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 配置 element-plus 例如el-message等组件自动导入样式
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

import eslintPlugin from 'vite-plugin-eslint'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	console.log(mode)
	return {
		base: './',
		resolve: {
			alias: {
				'@': resolve(__dirname, './src')
			}
		},
		plugins: [
			vue(),
			AutoImport({
				resolvers: [ElementPlusResolver()],
				imports: ['vue', 'vue-router']
			}),
			Components({
				resolvers: [ElementPlusResolver()]
			}),
			createStyleImportPlugin({
				resolves: [ElementPlusResolve()],
				libs: [
					{
						libraryName: 'element-plus',
						esModule: true,
						resolveStyle: (name: string) => {
							return `element-plus/theme-chalk/${name}.css`
						}
					}
				]
			}),
			// * EsLint 报错信息显示在浏览器界面上
			eslintPlugin(),
			// * name 可以写在 script 标签上
			VueSetupExtend()
		]
	}
})
