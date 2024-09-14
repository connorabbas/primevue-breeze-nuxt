import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.client) {
        const config = useRuntimeConfig();
        console.log(config.public);
        const authStore = useAuthStore();
        //await authStore.getUser(); Shouldn't have to refetch the User, when the 'auth' middleware comes before
        if (
            config.public.userMustHaveVerifiedEmail &&
            authStore.user &&
            authStore.user.email_verified_at === null
        ) {
            if (to.name !== 'verify-mail') {
                return navigateTo({ name: 'verify-email' });
            }
        }
    }
});
