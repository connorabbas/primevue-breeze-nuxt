<script setup>
import { useTemplateRef } from 'vue';
import { useAuthStore } from '~/stores/auth';

useHead({
    title: 'Forgot Password',
});
definePageMeta({
    layout: false,
    middleware: ['guest'],
});

const authStore = useAuthStore();
const { flashMessages, setFlashMessage } = useFlashMessage();

const emailInput = useTemplateRef('email-input');

const validationErrors = ref({});
const form = reactive({
    email: '',
});

const { status: requestPasswordResetLinkStatus, execute: requestPasswordResetLink } = useApiFetch('/forgot-password', {
    method: 'POST',
    body: form,
    onResponse({ request, response, options }) {
        if (response.ok) {
            validationErrors.value = {};
            setFlashMessage('success', response._data.status);
        } else if (response.status === 422) {
            validationErrors.value = response._data.errors;
        }
    },
});

async function handleForgotPasswordRequest() {
    await authStore.fetchXsrfCookie();
    await requestPasswordResetLink();
}

const processingFormRequest = computed(() => {
    return authStore.fetchXsrfCookieStatus.value == 'pending' || requestPasswordResetLinkStatus.value == 'pending';
});

onMounted(() => {
    emailInput.value.$el.focus();
});
</script>

<template>
    <NuxtLayout name="guest">
        <template
            #message
            v-if="flashMessages.success"
        >
            <Message
                severity="success"
                :closable="false"
                class="shadow"
            >
                {{ flashMessages.success }}
            </Message>
        </template>
        <template #content>
            <div class="mb-6 text-sm text-muted-color">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>
            <form @submit.prevent="handleForgotPasswordRequest">
                <div class="mb-6">
                    <label
                        for="email"
                        class="block mb-2"
                        >Email</label
                    >
                    <InputText
                        required
                        ref="email-input"
                        id="email"
                        type="email"
                        v-model="form.email"
                        class="w-full"
                        :invalid="Boolean(validationErrors?.email)"
                        autocomplete="username"
                    />
                    <InputErrors
                        class="mt-2"
                        :errors="validationErrors?.email"
                    />
                </div>

                <div class="flex justify-end items-center">
                    <Button
                        raised
                        type="submit"
                        :loading="processingFormRequest"
                        label="Email Password Reset Link"
                        severity="contrast"
                    />
                </div>
            </form>
        </template>
    </NuxtLayout>
</template>
