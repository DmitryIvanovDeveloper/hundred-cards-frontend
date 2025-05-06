import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
    base: '/',
    cacheDir: './node_modules/vite',
    plugins: [
        vue(),
        tailwindcss(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],

    server: {
        host: true,
        port: 5174,
        fs: {
            strict: false,
        },
        proxy: {
            '/api': {
                target: 'https://lk.hartiya.ykdev.ru', // Адрес вашего бэкенда
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    resolve: {
        extensions: ['.ts', '.vue'],
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@business': path.resolve(__dirname, './src/business'),
            '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
            '@repository': path.resolve(__dirname, './src/infrastructure/domain/repository'),
            '@service': path.resolve(__dirname, './src/infrastructure/domain/service'),
            '@/modules': path.resolve(__dirname, './src/modules'),
            '@assets': path.resolve(__dirname, './src/assets'),
            icons: path.resolve(__dirname, 'node_modules/vue-material-design-icons'),
        },
    },
});
