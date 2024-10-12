const path = require('path');
import customThemePreset from './theme-preset.js';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    //ssr: false,
    //target: 'static',
    modules: ['@nuxtjs/tailwindcss', '@primevue/nuxt-module', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    nitro: {
        output: {
            publicDir: path.join(__dirname, '/dist'),
        },
    },
    devServer: {
        port: process.env.NUXT_DEV_SERVER_PORT || 3000,
    },
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
            userMustHaveVerifiedEmail: process.env.NUXT_PUBLIC_USER_VERIFIED_EMAIL_REQUIRED === 'true',
        },
    },
    app: {
        head: {
            title: 'Nuxt + PrimeVue + Breeze API',
            link: [
                { rel: 'preconnect', href: 'https://fonts.bunny.net' },
                { rel: 'stylesheet', href: 'https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap' },
            ],
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
        options: {
            theme: customThemePreset,
        },
        autoImport: false,
    },
    tailwindcss: { cssPath: false, viewer: false, configPath: './tailwind.config.js' },
    css: ['primeicons/primeicons.css', '~/assets/css/app.css'],
});
