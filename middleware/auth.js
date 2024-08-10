import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    // wrap in client check for now
    if (import.meta.client) {
        const authStore = useAuthStore();
        await authStore.getUser();
        if (!authStore.user) {
            return navigateTo('/login');
        }
    }
});
