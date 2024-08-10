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

    const { status: getUserStatus, execute: getUser } = useLaravelApiFetch('/api/user', {
        immediate: false,
        watch: false,
        onRequestError({ request, options, error }) {
            triggerAuthServerErrorToast();
        },
        onResponse({ request, response, options }) {
            if (response.ok) {
                user.value = response._data;
            }
        },
        onResponseError({ request, response, options }) {
            if (response.status == 401) {
                // endpoint is fine, user is unauthorized
                user.value = null;
            } else {
                triggerAuthServerErrorToast();
            }
        },
    });
    const { status: logoutStatus, execute: logout } = useLaravelApiFetch('/logout', {
        immediate: false,
        watch: false,
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
    function getCsrfCookie() {
        return axios.get('/sanctum/csrf-cookie');
    }
    function requestPasswordResetLink(formData) {
        return getCsrfCookie().then(() => {
            return axios.post('/forgot-password', formData);
        });
    }
    function resetPassword(formData) {
        return getCsrfCookie().then(() => {
            return axios.post('/reset-password', formData);
        });
    }
    function sendVerificationEmail() {
        return axios.post('/email/verification-notification').then((response) => {
            setFlashMessage('success', response.data.status);
        });
    }

    return {
        mustVerifyEmail,
        user,
        getUser,
        getCsrfCookie,
        requestPasswordResetLink,
        resetPassword,
        sendVerificationEmail,
        logout,
    };
});
