<script setup>
useHead({
    title: 'Dashboard',
});
definePageMeta({
    middleware: 'auth',
});
</script>

<template>
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
</template>
