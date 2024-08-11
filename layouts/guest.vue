<template>
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        <div>
            <NuxtLink to="/">
                <ApplicationLogo class="w-20 h-15 text-center fill-current text-surface-900 dark:text-primary-400" />
            </NuxtLink>
        </div>

        <div
            v-if="$slots.message"
            class="w-full sm:max-w-md mt-6 px-4 sm:px-0"
        >
            <slot name="message" />
        </div>

        <div class="w-full sm:max-w-md mt-6">
            <ResponsiveCard>
                <slot name="content" />
            </ResponsiveCard>
        </div>
    </div>
</template>
