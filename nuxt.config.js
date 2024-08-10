import customizedThemePreset from './theme-preset.mjs';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    modules: ['@pinia/nuxt', '@primevue/nuxt-module'],
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    devServer: {
        port: process.env.NUXT_DEV_SERVER_PORT || 3000,
    },
    runtimeConfig: {
        public: {
            laravelApiBase: process.env.NUXT_PUBLIC_LARAVEL_API_BASE_URL,
        },
    },
    app: {
        head: {
            title: 'Nuxt + PrimeVue + Breeze API',
        },
        meta: [{ name: 'description', content: 'Nuxt + PrimeVue + Breeze API Starter Kit' }],
    },
    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    primevue: {
        autoImport: true,
        options: {
            theme: {
                preset: customizedThemePreset,
                options: {
                    darkModeSelector: '.dark-mode',
                    cssLayer: {
                        name: 'primevue',
                        order: 'tailwind-base, primevue, tailwind-utilities',
                    },
                },
            },
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: ['~/assets/css/app.css', 'primeicons/primeicons.css'],
});
