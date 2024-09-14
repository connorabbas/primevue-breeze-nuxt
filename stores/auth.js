import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';

export const useAuthStore = defineStore('auth', () => {
    const toast = useToast();
    const { setFlashMessage } = useFlashMessage();

    const mustVerifyEmail = false;
    const user = ref(null);

    function triggerAuthServerErrorToast(summary = 'Authentication Error') {
        user.value = null;
        toast.removeAllGroups(); // prevent multiple of the same toast from popping up
        toast.add({
            severity: 'error',
            summary: summary,
            detail: 'Unable to reach the authentication server, please try again later.',
            life: 3000,
        });
    }

    const { status: getXsrfCookieStatus, execute: getXsrfCookie } = useLaravelApiFetch('/sanctum/csrf-cookie');

    const { status: getUserStatus, execute: getUser } = useLaravelApiFetch('/api/user', {
        onResponse({ request, response, options }) {
            if (response.ok && response._data?.id && response._data?.name && response._data?.email) {
                user.value = response._data;
            }
        },
        onResponseError({ request, response, options }) {
            if (response.status == 401) {
                // User is unauthorized
                user.value = null;
            } else {
                triggerAuthServerErrorToast();
            }
        },
    });

    const { status: logoutStatus, execute: logout } = useLaravelApiFetch('/logout', {
        method: 'POST',
        onResponse({ request, response, options }) {
            if (response.ok) {
                user.value = null;
                navigateTo({ name: 'index' });
            }
        },
        onResponseError({ request, response, options }) {
            triggerAuthServerErrorToast('Logout Error');
        },
    });

    // TODO: convert to useFetch()
    function sendVerificationEmail() {
        return axios.post('/email/verification-notification').then((response) => {
            setFlashMessage('success', response.data.status);
        });
    }

    return {
        mustVerifyEmail,
        user,
        getUser,
        getUserStatus,
        getXsrfCookie,
        getXsrfCookieStatus,
        sendVerificationEmail,
        logout,
    };
});
