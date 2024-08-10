export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:beforeMount', () => {
        const { initSiteTheme } = useTheme();
        initSiteTheme();
    });
});
