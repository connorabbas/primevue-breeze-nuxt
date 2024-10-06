<script setup>
useHead({
    title: 'Dashboard',
});
definePageMeta({
    layout: false,
    middleware: ['auth', 'verified-user'],
});
</script>

<template>
    <div>
        <NuxtLayout name="authenticated">
            <template #header>
                <h2 class="font-semibold text-xl leading-tight">Dashboard</h2>
            </template>
            <Container :spaced-mobile="false">
                <div class="py-12">
                    <ResponsiveCard>
                        <p class="m-0">You are logged in!</p>
                    </ResponsiveCard>
                </div>
            </Container>
        </NuxtLayout>
    </div>
</template>
