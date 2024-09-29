<script setup>
import { useTemplateRef } from 'vue';
import InputErrors from '~/components/InputErrors.vue';

const passwordInput = useTemplateRef('password-input');
const modalOpen = ref(false);

const form = reactive({
    password: '',
});

function deleteUser() {
    // Breeze API installation does not include profile related routes/functionality, implement as needed...
    modalOpen.value = false;
}

watch(modalOpen, (newModalOpen) => {
    if (newModalOpen) {
        nextTick(() => {
            if (passwordInput.value?.$el) {
                passwordInput.value.$el.focus();
            }
        });
    }
});
</script>

<template>
    <section class="space-y-6">
        <Dialog
            :draggable="false"
            position="center"
            v-model:visible="modalOpen"
            modal
            header="Are you sure you want to delete your account?"
            :style="{ width: '40rem' }"
        >
            <div class="mb-6">
                <p class="m-0 text-muted-color">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Please
                    enter your password to confirm you would like to permanently delete your account.
                </p>
            </div>

            <div>
                <InputText
                    required
                    id="password"
                    ref="password-input"
                    type="password"
                    placeholder="Password"
                    v-model="form.password"
                    class="w-full"
                    :invalid="false"
                    autocomplete="current-password"
                    @keyup.enter="deleteUser"
                    autofocus
                />
                <InputErrors
                    class="mt-2"
                    :errors="[]"
                />
            </div>

            <template #footer>
                <Button
                    class="mr-2"
                    label="Cancel"
                    plain
                    text
                    @click="modalOpen = false"
                />
                <Button
                    raised
                    @click="deleteUser"
                    :loading="false"
                    label="Delete Account"
                    severity="danger"
                />
            </template>
        </Dialog>

        <header>
            <h2 class="text-lg font-medium mt-0 mb-2">Delete Account</h2>
            <p class="mb-0 text-sm text-muted-color">
                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
                your account, please download any data or information that you wish to retain.
            </p>
        </header>

        <Button
            raised
            @click="modalOpen = true"
            label="Delete Account"
            severity="danger"
        />
    </section>
</template>
