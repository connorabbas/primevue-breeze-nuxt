import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const guestMiddleware = async () => {
        const authStore = useAuthStore();
        await authStore.getUser();
        if (authStore.user) {
            return navigateTo('/dashboard');
        }
    };
    return guestMiddleware();
});
