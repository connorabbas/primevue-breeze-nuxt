<script setup>
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '@/stores/auth';

useHead({
    title: 'Verify Email',
});
definePageMeta({
    layout: false,
    middleware: ['auth'],
});

const toast = useToast();
const authStore = useAuthStore();
const { flashMessages } = useFlashMessage();

const processing = ref(false);

const verificationLinkSent = computed(() => flashMessages.success === 'verification-link-sent');

const submit = () => {
    processing.value = true;
    authStore
        .sendVerificationEmail()
        .finally(() => {
            processing.value = false;
        });
};
async function logout() {
    await authStore.logout();
}
</script>

<template>
    <div>
        <NuxtLayout name="guest">
            <template
                #message
                v-if="verificationLinkSent"
            >
                <Message
                    severity="success"
                    :closable="false"
                    class="shadow"
                >
                    A new verification link has been sent to the email address you provided during registration.
                </Message>
            </template>
            <template #content>
                {{ flashMessages }}
                <div class="mb-6 text-sm text-muted-color">
                    Thanks for signing up! Before getting started, could you verify your email address by clicking on
                    the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                </div>

                <form @submit.prevent="submit">
                    <div class="mt-6 flex justify-between items-center">
                        <Button
                            raised
                            type="submit"
                            :loading="processing"
                            label="Resend Verification Email"
                            severity="contrast"
                        />
                        <a
                            @click="logout()"
                            href="#"
                            class="text-muted-color underline text-muted-color hover:text-color"
                        >
                            Log Out
                        </a>
                    </div>
                </form>
            </template>
        </NuxtLayout>
    </div>
</template>
