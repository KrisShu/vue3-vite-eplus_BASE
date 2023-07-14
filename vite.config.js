import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
	resolve
} from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
	ElementPlusResolver
} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/

//
export default defineConfig({
	resolve: {
		alias: {
			"@": resolve(__dirname, './src')
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "@/assets/styles/theme/index.scss" as *;`,
			},
		},
	},
	plugins: [
		vue(),
		AutoImport({
			resolvers: [
				ElementPlusResolver({
					importStyle: "sass",
				}),
			],
		}),
		Components({
			resolvers: [
				ElementPlusResolver({
					importStyle: "sass",
					// directives: true,
					// version: "2.1.5",
				}),
			],
		}),
	],
	server:{
		port:8080
	}

})