import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';
// import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/

const pathSrc = resolve(__dirname, 'src');
export default defineConfig(({ mode }) => {
    return {
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/assets/styles/theme/index.scss" as *;`,
                },
            },
        },
        // 配置需要使用的插件列表
        plugins: [
            vue(),
            AutoImport({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass',
                    }),
                ],
            }),
            Components({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass',
                        // directives: true,
                        // version: "2.1.5",
                    }),
                ],
            }),
            visualizer({ open: true }),
        ],
        // 生产环境配置
        build: {
            // terser
            /* minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            }, */
            // 默认esbulid
            esbuild: {
                drop: mode === 'production' ? ['console', 'debugger'] : [],
            },
        },
        server: {
            hmr: true, // 开启热更新
            port: 8082,
        },
    };
});
