import { ofetch } from 'ofetch';
import { useToast } from 'primevue/usetoast';

export default defineNuxtPlugin({
    name: 'app',
    enforce: 'default',
    parallel: true,
    async setup(nuxtApp) {
        const toast = useToast();
        const authStore = useAuthStore();

        // site theme
        const { setTheme, currentTheme } = useTheme();
        setTheme(currentTheme.value);

        // fetch configuration
        globalThis.$fetch = ofetch.create({
            retry: false,
            onRequestError({ error }) {
                if (import.meta.server) return;
                if (error.name === 'AbortError') return;
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.message ?? 'Something went wrong',
                    life: 3000,
                });
            },
            onResponseError({ response }) {
                if (response.status === 401) {
                    if (authStore.logged) {
                        authStore.user = null;
                    }
                    if (import.meta.client) {
                        toast.add({
                            severity: 'info',
                            summary: 'Unauthorized',
                            detail: 'Please log in to continue',
                            life: 3000,
                        });
                    }
                } else if (response.status !== 422) {
                    if (import.meta.client) {
                        toast.removeAllGroups();
                        toast.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: response._data?.message ?? response.statusText ?? 'Something went wrong',
                            life: 3000,
                        });
                    }
                }
            },
        });
    },
});
