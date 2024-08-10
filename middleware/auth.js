import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.client) {
        const authStore = useAuthStore();
        await authStore.getUser();
        if (!authStore.user) {
            const intendedRoute = to.fullPath;
            return navigateTo({
                name: 'login',
                query: { redirect: intendedRoute },
            });
        }
    }
});
