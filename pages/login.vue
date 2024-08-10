<script setup>
import { useToast } from 'primevue/usetoast';

useHead({
    title: 'Login',
});
definePageMeta({
    middleware: 'guest',
    layout: false,
});

const toast = useToast();
const route = useRoute();
const { flashMessages } = useFlashMessage();

const emailInput = ref();

const validationErrors = ref({});
const form = reactive({
    email: '',
    password: '',
    remember: false,
});

const { status: getXsrfStatus, execute: getXsrf } = useLaravelApiFetch('/sanctum/csrf-cookie', {
    immediate: false,
    watch: false,
});
const { status: attemptLoginStatus, execute: attemptLogin } = useLaravelApiFetch('/login', {
    immediate: false,
    watch: false,
    method: 'POST',
    body: form,
    onResponse({ request, response, options }) {
        if (response.ok) {
            navigateTo(route.query.redirect || { name: 'dashboard' });
        }
    },
    onResponseError({ request, response, options }) {
        if (response.status === 422) {
            validationErrors.value = response._data.errors;
        } else {
            toast.add({
                severity: 'error',
                summary: 'Login Failed',
                detail: 'Unable to reach the authentication server, please try again later.',
                life: 3000,
            });
        }
    },
});
async function handleLogin() {
    await getXsrf();
    await attemptLogin();
}

const loggingIn = computed(() => {
    return getXsrfStatus.value == 'pending' || attemptLoginStatus.value == 'pending';
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
                            ref="emailInput"
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
