<script setup>
import { useTheme } from '~/composables/useTheme.js';

const { initSiteTheme } = useTheme();
initSiteTheme();
</script>

<template>
    <div class="h-full bg-surface-100 dark:bg-surface-950">
        <Toast />
        <!-- <NuxtLoadingIndicator /> -->
        <NuxtPage />
    </div>
</template>
