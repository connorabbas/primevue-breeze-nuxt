import { useCookies } from '@vueuse/integrations/useCookies';

export default defineNuxtRouteMiddleware((to, from) => {
    const { get: getCookie } = useCookies();
    let selectedTheme = 'light';
    if (import.meta.env.SSR) {
        const req = useRequestHeaders();
        const cookie = req.cookie || '';
        const themeMatch = cookie.match(/selectedTheme=([^;]*)/);
        selectedTheme = themeMatch ? themeMatch[1] : 'light';
        useHead({
            htmlAttrs: {
                class: selectedTheme === 'dark' ? 'dark-mode' : '',
            },
        });
    } else if (import.meta.client) {
        selectedTheme = getCookie('selectedTheme') || 'light';
        const domHtml = document.documentElement;
        domHtml.classList.toggle('dark-mode', selectedTheme === 'dark');
    }
});
