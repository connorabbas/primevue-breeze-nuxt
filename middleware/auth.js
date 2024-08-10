import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();
    await authStore.getUser();
    console.log(authStore.user);
    if (!authStore.user) {
        return navigateTo('/login');
    }
});
