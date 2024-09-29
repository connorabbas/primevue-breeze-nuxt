<script setup>
import { useTemplateRef } from 'vue';
import { useAuthStore } from '~/stores/auth';

useHead({
    title: 'Login',
});
definePageMeta({
    layout: false,
    middleware: ['guest'],
});

const route = useRoute();
const authStore = useAuthStore();
const { flashMessages } = useFlashMessage();

const emailInput = useTemplateRef('email-input');

const validationErrors = ref({});
const form = reactive({
    email: '',
    password: '',
    remember: false,
});

const { status: attemptLoginStatus, execute: attemptLogin } = useApiFetch('/login', {
    method: 'POST',
    body: form,
    async onResponse({ response }) {
        form.password = null;
        if (response.ok) {
            console.log('login ok');
            validationErrors.value = {};
            await authStore.fetchUser();
            navigateTo(route.query.redirect || { name: 'dashboard' });
        } else if (response.status === 422) {
            validationErrors.value = response._data.errors;
        }
    },
});
async function handleLogin() {
    await authStore.fetchXsrfCookie();
    await attemptLogin();
}

const loggingIn = computed(() => {
    return authStore.fetchXsrfCookieStatus.value == 'pending' || attemptLoginStatus.value == 'pending';
});

onMounted(() => {
    if (emailInput.value?.$el) {
        emailInput.value.$el.focus();
    }
});
</script>

<template>
    <div>
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
                <form @submit.prevent="handleLogin">
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
                            >Password</label
                        >
                        <InputText
                            required
                            id="password"
                            type="password"
                            v-model="form.password"
                            class="w-full"
                            :invalid="Boolean(validationErrors?.password)"
                            autocomplete="current-password"
                        />
                        <InputErrors
                            class="mt-2"
                            :errors="validationErrors?.password"
                        />
                    </div>
                    <div class="mb-8">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <Checkbox
                                    id="remember"
                                    :binary="true"
                                    v-model="form.remember"
                                    class="mr-2"
                                ></Checkbox>
                                <label for="remember">Remember me</label>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end items-center">
                        <NuxtLink
                            :to="{ name: 'forgot-password' }"
                            class="mr-4 underline text-muted-color hover:text-color"
                        >
                            Forgot your password?
                        </NuxtLink>
                        <Button
                            raised
                            type="submit"
                            :loading="loggingIn"
                            label="Log In"
                            severity="contrast"
                        />
                    </div>
                </form>
            </template>
        </NuxtLayout>
    </div>
</template>
