import { ofetch } from 'ofetch';
import { useToast } from 'primevue/usetoast';

export default defineNuxtPlugin({
    name: 'app',
    enforce: 'default',
    parallel: true,
    async setup(nuxtApp) {
        const toast = useToast();
        const authStore = useAuthStore(nuxtApp.$pinia);

        // fetch configuration, error handling
        globalThis.$fetch = ofetch.create({
            retry: false,
            onRequestError({ error }) {
                if (import.meta.server) return;
                if (error.name === 'AbortError') return;
                toast.removeAllGroups();
                toast.add({
                    severity: 'error',
                    summary: 'Network Error',
                    detail: 'The server did not respond.',
                    life: 3000,
                });
            },
            onResponseError({ response }) {
                if (response.status === 401) {
                    authStore.user = null;
                    if (import.meta.client) {
                        toast.add({
                            severity: 'info',
                            summary: 'Unauthorized',
                            detail: 'Please log in.',
                            life: 4000,
                        });
                    }
                } else if (response.status >= 500) {
                    toast.add({
                        severity: 'info',
                        summary: 'Server Error',
                        detail: 'A critical error occurred.',
                        life: 3000,
                    });
                }
            },
        });
    },
});
