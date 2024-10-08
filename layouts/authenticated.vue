<script setup>
import { useTemplateRef } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const route = useRoute();
const currentRouteName = computed(() => route.name);

// Main menu
const mainMenuItems = [
    {
        label: 'Dashboard',
        route: { name: 'dashboard' },
        active: currentRouteName.value == 'dashboard',
    },
];

// User menu (desktop)
const userMenu = useTemplateRef('user-menu');
const userMenuItems = [
    {
        label: 'Profile',
        icon: 'pi pi-user',
        route: { name: 'profile' },
    },
    {
        label: 'Log Out',
        icon: 'pi pi-sign-out',
        command: () => logout(),
    },
];
const toggleUserMenu = (event) => {
    userMenu.value.childRef.toggle(event);
};
const userName = computed(() => {
    return authStore?.user?.name ?? 'User';
});

// Mobile menu (Drawer)
const homeMobileMenuItems = ref([
    {
        label: 'Welcome',
        icon: 'pi pi-home',
        route: { name: 'index' },
        active: currentRouteName.value == 'index',
    },
    {
        label: 'Dashboard',
        icon: 'pi pi-th-large',
        route: { name: 'dashboard' },
        active: currentRouteName.value == 'dashboard',
    },
]);
const mobileMenuOpen = ref(false);
if (import.meta.client) {
    const windowWidth = ref(window.innerWidth);
    const updateWidth = () => {
        windowWidth.value = window.innerWidth;
    };
    onMounted(() => {
        window.addEventListener('resize', updateWidth);
    });
    onUnmounted(() => {
        window.removeEventListener('resize', updateWidth);
    });
    watchEffect(() => {
        if (windowWidth.value > 768) {
            mobileMenuOpen.value = false;
        }
    });
}

async function logout() {
    await authStore.logout();
}
</script>

<template>
    <div>
        <div class="min-h-screen">
            <nav
                class="bg-surface-0 dark:bg-surface-900 border-b"
                :class="
                    $slots.header
                        ? 'border-surface-100 dark:border-surface-800'
                        : 'border-surface-0 dark:border-surface-900 shadow'
                "
            >
                <!-- Primary Navigation Menu -->
                <Container>
                    <LinksMenuBar
                        :model="mainMenuItems"
                        :pt="{
                            root: {
                                class: '!px-0 !py-3 !border-0 !rounded-none',
                            },
                            button: {
                                class: '!hidden',
                            },
                        }"
                    >
                        <template #start>
                            <!-- Logo -->
                            <div class="shrink-0 flex items-center mr-5">
                                <NuxtLink to="/">
                                    <ApplicationLogo
                                        class="block w-auto h-7 fill-current text-surface-900 dark:text-primary-400"
                                    />
                                </NuxtLink>
                            </div>
                        </template>
                        <template #end>
                            <div class="hidden md:flex md:items-center md:ms-6">
                                <ClientOnly>
                                    <ToggleThemeButton
                                        text
                                        severity="secondary"
                                        rounded
                                    />
                                </ClientOnly>
                                <!-- User Dropdown Menu -->
                                <div class="ms-3 relative">
                                    <LinksMenu
                                        :model="userMenuItems"
                                        popup
                                        ref="user-menu"
                                        class="shadow"
                                    />
                                    <Button
                                        text
                                        size="small"
                                        severity="secondary"
                                        @click="toggleUserMenu($event)"
                                    >
                                        <span class="text-base">{{ userName }}</span>
                                        <i class="pi pi-angle-down ml-1"></i>
                                    </Button>
                                </div>
                            </div>

                            <!-- Hamburger -->
                            <div class="flex items-center md:hidden">
                                <div class="relative">
                                    <Button
                                        text
                                        rounded
                                        severity="secondary"
                                        icon="pi pi-bars"
                                        @click="mobileMenuOpen = true"
                                    />
                                </div>
                            </div>
                        </template>
                    </LinksMenuBar>
                </Container>

                <!-- Mobile drawer menu -->
                <Drawer
                    v-model:visible="mobileMenuOpen"
                    position="right"
                >
                    <template #header>
                        <ClientOnly>
                            <ToggleThemeButton
                                text
                                severity="secondary"
                                rounded
                            />
                        </ClientOnly>
                    </template>
                    <div>
                        <div class="mb-5">
                            <p class="text-muted-color font-bold uppercase text-sm mb-2"> Home </p>
                            <LinksPanelMenu
                                :model="homeMobileMenuItems"
                                class="w-full"
                            />
                        </div>
                    </div>
                    <template #footer>
                        <div class="flex items-center gap-2">
                            <div class="grow">
                                <NuxtLink
                                    :to="{ name: 'profile' }"
                                    class="flex-auto"
                                >
                                    <Button
                                        label="Profile"
                                        icon="pi pi-user"
                                        class="w-full"
                                        severity="secondary"
                                        outlined
                                    ></Button>
                                </NuxtLink>
                            </div>
                            <div class="grow">
                                <Button
                                    @click="logout()"
                                    label="Logout"
                                    icon="pi pi-sign-out"
                                    class="w-full"
                                    severity="danger"
                                    text
                                ></Button>
                            </div>
                        </div>
                    </template>
                </Drawer>
            </nav>

            <!-- Page Heading -->
            <header
                class="bg-surface-0 dark:bg-surface-900 shadow"
                v-if="$slots.header"
            >
                <Container>
                    <div class="py-6">
                        <slot name="header" />
                    </div>
                </Container>
            </header>

            <!-- Page Content -->
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>
