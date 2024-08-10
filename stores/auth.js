import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';

export const useAuthStore = defineStore('auth', () => {
    const toast = useToast();
    const { setFlashMessage } = useFlashMessage();

    const mustVerifyEmail = false;
    const user = ref(null);

    const { status: getUserStatus, execute: getUser } = useLaravelApiFetch('/api/user', {
        immediate: false,
        watch: false,
        onResponse({ request, response, options }) {
            if (response.ok && response.status >= 200 && response.status < 300) {
                user.value = response._data;
            } else if (response.status == 401) {
                // endpoint is fine, user is unauthorized
                user.value = null;
            } else {
                user.value = null;
                toast.removeAllGroups(); // prevent multiple of the same toast from popping up
                toast.add({
                    severity: 'error',
                    summary: 'Authentication Error',
                    detail: 'Unable to reach the authentication server, please try again later.',
                    life: 3000,
                });
            }
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
    function logout() {
        return axios.post('/logout').then((response) => {
            console.log(response);
            user.value = null;
            navigateTo('/');
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
