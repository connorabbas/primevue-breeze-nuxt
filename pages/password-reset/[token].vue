<script setup>
import { useTemplateRef } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useToast } from 'primevue/usetoast';

useHead({
    title: 'Reset Password',
});
definePageMeta({
    layout: false,
    middleware: ['guest'],
});

const toast = useToast();
const route = useRoute();
const authStore = useAuthStore();
const { setFlashMessage } = useFlashMessage();

const emailInput = useTemplateRef('email-input');

const validationErrors = ref({});
const form = reactive({
    token: route.params.token,
    email: route.query?.email ?? '',
    password: '',
    password_confirmation: '',
});

const { status: resetPasswordStatus, execute: resetPassword } = useApiFetch('/reset-password', {
    method: 'POST',
    body: form,
    onResponse({ request, response, options }) {
        if (response.ok) {
            validationErrors.value = {};
            navigateTo({ name: 'login' }).then(() => {
                setFlashMessage('success', response._data.status);
            });
        }
    },
    onResponseError({ request, response, options }) {
        if (response.status === 422) {
            validationErrors.value = response._data.errors;
        } else {
            toast.add({
                severity: 'error',
                summary: 'Request Failed',
                detail: 'Something went wrong, please try again later.',
                life: 3000,
            });
        }
    },
});

async function handleResetPasswordRequest() {
    await authStore.getXsrfCookie();
    await resetPassword();
}

const processingFormRequest = computed(() => {
    return authStore.getXsrfCookieStatus.value == 'pending' || resetPasswordStatus.value == 'pending';
});

onMounted(() => {
    emailInput.value.$el.focus();
});
</script>

<template>
    <NuxtLayout name="guest">
        <template #content>
            <form @submit.prevent="handleResetPasswordRequest">
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

                <div class="mb-6">
                    <label
                        for="password"
                        class="block mb-2"
                        >New Password</label
                    >
                    <InputText
                        id="password"
                        type="password"
                        v-model="form.password"
                        class="w-full"
                        :invalid="Boolean(validationErrors?.password)"
                        required
                        autocomplete="new-password"
                    />
                    <InputErrors
                        class="mt-2 mb-1"
                        :errors="validationErrors?.password"
                    />
                </div>

                <div class="mb-6">
                    <label
                        for="password_confirmation"
                        class="block mb-2"
                        >Confirm New Password</label
                    >
                    <InputText
                        id="password_confirmation"
                        type="password"
                        v-model="form.password_confirmation"
                        class="w-full"
                        :invalid="Boolean(validationErrors?.password_confirmation)"
                        required
                        autocomplete="new-password"
                    />
                    <InputErrors
                        class="mt-2 mb-1"
                        :errors="validationErrors?.password_confirmation"
                    />
                </div>

                <div class="flex justify-end items-center">
                    <Button
                        raised
                        type="submit"
                        :loading="processingFormRequest"
                        label="Reset Password"
                        severity="contrast"
                    />
                </div>
            </form>
        </template>
    </NuxtLayout>
</template>
