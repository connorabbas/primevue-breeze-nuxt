import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp();
    const authStore = useAuthStore(nuxtApp.$pinia);

    if (!authStore.user) {
        await authStore.getUser();
    }
});
