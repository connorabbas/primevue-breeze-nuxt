import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp();
    const authStore = useAuthStore(nuxtApp.$pinia);

    if (!authStore.user) {
        const intendedRoute = to.fullPath;
        return navigateTo({
            name: 'login',
            query: { redirect: intendedRoute },
        });
    }
});
