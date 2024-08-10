export default defineNuxtPlugin((nuxtApp) => {
    /* <NuxtLoadingIndicator /> is just not working for whatever reason... */
    nuxtApp.hook('page:start', () => {
        progress.start();
    });
    nuxtApp.hook('page:finish', () => {
        progress.done();
    });
});
