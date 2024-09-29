import { defineStore } from 'pinia';

export const useAuthStore = defineStore(
    'auth',
    () => {
        const { setFlashMessage } = useFlashMessage();

        const user = ref(null);

        const { status: fetchXsrfCookieStatus, execute: fetchXsrfCookie } = useApiFetch('/sanctum/csrf-cookie');

        const { status: fetchUserStatus, execute: fetchUser } = useApiFetch('/api/user', {
            onResponse({ response }) {
                console.log('fetched user');
                if (response.status === 200) {
                    user.value = response._data;
                }
            },
        });

        const { execute: logout } = useApiFetch('/logout', {
            method: 'POST',
            onResponse({ response }) {
                if (response.ok) {
                    user.value = null;
                    navigateTo({ name: 'index' });
                }
            },
        });

        const { status: sendVerificationEmailStatus, execute: sendVerificationEmail } = useApiFetch(
            '/email/verification-notification',
            {
                method: 'POST',
                onResponse({ response }) {
                    if (response.ok) {
                        setFlashMessage('success', response._data.status);
                    }
                },
            }
        );

        return {
            user,
            fetchUser,
            fetchUserStatus,
            fetchXsrfCookie,
            fetchXsrfCookieStatus,
            sendVerificationEmail,
            sendVerificationEmailStatus,
            logout,
        };
    },
    {
        // remove for client-side only applications
        persist: {
            pick: ['user'],
        },
    }
);
