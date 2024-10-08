<script setup>
import { useTemplateRef } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '~/stores/auth';

const config = useRuntimeConfig();
const toast = useToast();
const authStore = useAuthStore();
const { flashMessages } = useFlashMessage();

const nameInput = useTemplateRef('name-input');

const form = reactive({
    name: authStore.user.name || '',
    email: authStore.user.email || '',
});

function updateProfileInformation() {
    // Breeze API installation does not include profile related routes/functionality, implement as needed...
    toast.add({
        severity: 'success',
        summary: 'Saved',
        detail: 'Profile information has been updated',
        life: 3000,
    });
}

const verificationLinkSent = computed(() => flashMessages.success === 'verification-link-sent');

onMounted(() => {
    if (nameInput.value?.$el) {
        nameInput.value.$el.focus();
    }
});
</script>

<template>
    <section>
        <header>
            <h2 class="text-lg font-medium mt-0 mb-2">Profile Information</h2>
            <p class="mb-0 text-sm text-muted-color"> Update your account's profile information and email address. </p>
        </header>

        <form
            @submit.prevent="updateProfileInformation"
            class="mt-6 space-y-6"
        >
            <div>
                <label
                    for="name"
                    class="block mb-2"
                    >Name</label
                >
                <InputText
                    required
                    ref="name-input"
                    id="name"
                    type="text"
                    v-model="form.name"
                    class="w-full"
                    :invalid="false"
                    autocomplete="name"
                />
                <InputErrors
                    class="mt-2"
                    :errors="[]"
                />
            </div>
            <div>
                <label
                    for="email"
                    class="block mb-2"
                    >Email</label
                >
                <InputText
                    required
                    id="email"
                    type="email"
                    v-model="form.email"
                    class="w-full"
                    :invalid="false"
                    autocomplete="username"
                />
                <InputErrors
                    class="mt-2"
                    :errors="[]"
                />
            </div>

            <div v-if="config.public.userMustHaveVerifiedEmail && authStore.user.email_verified_at === null">
                <p class="text-sm mt-2">
                    Your email address is unverified.
                    <a
                        href="#"
                        @click="authStore.sendVerificationEmail"
                        class="underline text-sm text-muted-color underline text-muted-color hover:text-color"
                    >
                        Click here to re-send the verification email.
                    </a>
                </p>

                <Message
                    v-if="verificationLinkSent"
                    severity="success"
                    :closable="false"
                    class="shadow mt-4"
                >
                    A new verification link has been sent to your email address.
                </Message>
            </div>

            <div class="flex items-center gap-4">
                <Button
                    raised
                    type="submit"
                    :loading="false"
                    label="Save"
                    severity="contrast"
                />

                <Transition
                    enter-active-class="transition ease-in-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out"
                    leave-to-class="opacity-0"
                >
                    <p
                        v-if="false"
                        class="text-sm text-muted-color"
                    >
                        Saved.
                    </p>
                </Transition>
            </div>
        </form>
    </section>
</template>
