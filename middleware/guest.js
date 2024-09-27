import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp();
    const authStore = useAuthStore(nuxtApp.$pinia);

    await authStore.getUser();
    if (authStore.user) {
        return navigateTo({ name: 'dashboard' });
    }
});
