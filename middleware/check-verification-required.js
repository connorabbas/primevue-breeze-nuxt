export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.client) {
        const config = useRuntimeConfig();
        if (!config.public.userMustHaveVerifiedEmail) {
            return navigateTo({ name: 'dashboard' });
        }
    }
});
