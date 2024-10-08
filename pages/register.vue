<script setup>
import { useTemplateRef } from 'vue';
import { useAuthStore } from '~/stores/auth';

useHead({
    title: 'Register',
});
definePageMeta({
    layout: false,
    middleware: ['guest'],
});

const authStore = useAuthStore();

const nameInput = useTemplateRef('name-input');

const validationErrors = ref({});
const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const { status: attemptRegistrationStatus, execute: attemptRegistration } = useApiFetch('/register', {
    method: 'POST',
    body: form,
    async onResponse({ request, response, options }) {
        if (response.ok) {
            await authStore.fetchUser();
            navigateTo({ name: 'dashboard' });
        } else if (response.status === 422) {
            validationErrors.value = response._data.errors;
        }
    },
});
async function handleRegister() {
    await authStore.fetchXsrfCookie();
    await attemptRegistration();
}

const registering = computed(() => {
    return authStore.fetchXsrfCookieStatus.value == 'pending' || attemptRegistrationStatus.value == 'pending';
});

onMounted(() => {
    if (nameInput.value?.$el) {
        nameInput.value.$el.focus();
    }
});
</script>

<template>
    <div>
        <NuxtLayout name="guest">
            <form @submit.prevent="handleRegister">
                <div class="mb-6">
                    <label
                        for="name"
                        class="block mb-2"
                        >Name</label
                    >
                    <InputText
                        ref="name-input"
                        id="name"
                        type="text"
                        v-model="form.name"
                        class="w-full"
                        :invalid="Boolean(validationErrors?.name)"
                        required
                        autocomplete="name"
                    />
                    <InputErrors
                        class="mt-2"
                        :errors="validationErrors?.name"
                    />
                </div>
                <div class="mb-6">
                    <label
                        for="email"
                        class="block mb-2"
                        >Email</label
                    >
                    <InputText
                        id="email"
                        type="email"
                        v-model="form.email"
                        class="w-full"
                        :invalid="Boolean(validationErrors?.email)"
                        required
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
                        >Password</label
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
                        class="mt-2"
                        :errors="validationErrors?.password"
                    />
                </div>
                <div class="mb-6">
                    <label
                        for="password_confirmation"
                        class="block mb-2"
                        >Confirm Password</label
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
                        class="mt-2"
                        :errors="validationErrors?.password_confirmation"
                    />
                </div>
                <div class="flex justify-end items-center">
                    <NuxtLink
                        :to="{ name: 'login' }"
                        class="mr-4 text-muted-color underline text-muted-color hover:text-color"
                    >
                        Already registered?
                    </NuxtLink>
                    <Button
                        raised
                        type="submit"
                        :loading="registering"
                        label="Register"
                        severity="contrast"
                    />
                </div>
            </form>
        </NuxtLayout>
    </div>
</template>
