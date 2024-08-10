import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const authenticatedMiddleware = async () => {
        const authStore = useAuthStore();
        await authStore.getUser();
        if (!authStore.user) {
            return navigateTo('/login');
        }
    };
    return authenticatedMiddleware();
});
