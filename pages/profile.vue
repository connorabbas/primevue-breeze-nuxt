<script setup>
useHead({
    title: 'Profile',
});
definePageMeta({
    layout: false,
    middleware: ['auth'],
});
</script>

<template>
    <div>
        <NuxtLayout name="authenticated">
            <template #header>
                <h2 class="font-semibold text-xl leading-tight">Profile</h2>
            </template>
            <Container :spaced-mobile="false">
                <div class="py-12">
                    <div class="space-y-6">
                        <ResponsiveCard>
                            <UpdateProfileInformationForm class="max-w-xl" />
                        </ResponsiveCard>
                        <ResponsiveCard>
                            <UpdatePasswordForm class="max-w-xl" />
                        </ResponsiveCard>
                        <ResponsiveCard>
                            <DeleteUserForm class="max-w-xl" />
                        </ResponsiveCard>
                    </div>
                </div>
            </Container>
        </NuxtLayout>
    </div>
</template>
