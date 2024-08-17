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
                <h2 class="font-bold text-xl leading-tight">Dashboard</h2>
            </template>
            <template #content>
                <Container :spaced-mobile="false">
                    <div class="py-12">
                        <ResponsiveCard>
                            <p class="m-0">You are logged in!</p>
                        </ResponsiveCard>
                    </div>
                </Container>
            </template>
        </NuxtLayout>
    </div>
</template>
