import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';

export const useAuthStore = defineStore('auth', () => {
    const toast = useToast();
    const { setFlashMessage } = useFlashMessage();

    const mustVerifyEmail = false;
    const user = ref(null);

    function loginRedirect() {
        // TODO: intended redirect
        navigateTo({ name: 'dashboard' });
    }
    function getUserError() {
        user.value = null;
        toast.removeAllGroups(); // prevent multiple of the same toast from popping up
        toast.add({
            severity: 'error',
            summary: 'Authentication Error',
            detail: 'Unable to reach the authentication server, please try again later.',
            life: 3000,
        });
    }
    function getUser() {
        return axios
            .get('/api/user')
            .then((response) => {
                if (
                    response.status >= 200 &&
                    response.status < 300 &&
                    response.data?.id &&
                    response.data?.name &&
                    response.data?.email
                ) {
                    user.value = response.data;
                } else {
                    getUserError();
                }
            })
            .catch((error) => {
                if (error.response && error.response.status == 401) {
                    // endpoint is fine, user is unauthorized
                    user.value = null;
                } else {
                    getUserError();
                }
            });
    }
    function getCsrfCookie() {
        return axios.get('/sanctum/csrf-cookie');
    }
    function register(formData) {
        return getCsrfCookie().then(() => {
            return axios.post('/register', formData);
        });
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
            user.value = null;
            navigateTo('/');
        });
    }

    return {
        mustVerifyEmail,
        user,
        getUser,
        getCsrfCookie,
        loginRedirect,
        requestPasswordResetLink,
        resetPassword,
        sendVerificationEmail,
        register,
        logout,
    };
});
