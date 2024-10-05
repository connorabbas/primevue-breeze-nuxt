const path = require('path');

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    //ssr: false,
    //target: 'static',
    modules: ['@primevue/nuxt-module', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
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
        autoImport: false,
        importTheme: { from: '~/theme-preset.js' },
    },
    postcss: {
        plugins: {
            tailwindcss: {}, // TODO: https://tailwindcss.com/docs/guides/nuxtjs#modules
            autoprefixer: {},
        },
    },
    css: ['~/assets/css/app.css', 'primeicons/primeicons.css'],
});
