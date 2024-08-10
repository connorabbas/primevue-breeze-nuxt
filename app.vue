<template>
    <div class="h-full bg-surface-100 dark:bg-surface-950">
        <Toast />
        <NuxtLoadingIndicator
            :throttle="0"
            :height="1"
            color="var(--p-primary-400)"
        />
        <NuxtPage />
    </div>
</template>
