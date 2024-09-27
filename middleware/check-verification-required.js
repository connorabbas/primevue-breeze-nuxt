export default defineNuxtRouteMiddleware(async (to, from) => {
    const config = useRuntimeConfig();
    if (!config.public.userMustHaveVerifiedEmail) {
        return navigateTo({ name: 'dashboard' });
    }
});
