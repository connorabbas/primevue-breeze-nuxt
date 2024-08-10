<script setup>
import { useTheme } from '~/composables/useTheme.js';

const { initSiteTheme } = useTheme();

onMounted(() => {
    initSiteTheme();
});
</script>

<template>
    <div class="h-full bg-surface-100 dark:bg-surface-950">
        <Toast />
        <NuxtLoadingIndicator
            :throttle="0"
            :height="1"
            color="var(--p-primary-500)"
        />
        <NuxtPage />
    </div>
</template>
