export default defineNuxtPlugin(async (nuxtApp) => {
    nuxtApp.hook('app:beforeMount', () => {
        const { initSiteTheme } = useTheme();
        initSiteTheme();
    });
});
