export function useTheme() {
    const currentTheme = ref('light');

    function setTheme(theme) {
        const domHtml = document.documentElement;
        domHtml.classList.toggle('dark-mode', theme === 'dark');
        saveThemePreference(theme);
    }

    function saveThemePreference(theme) {
        currentTheme.value = theme;
        if (import.meta.client) {
            localStorage.setItem('selectedTheme', theme);
        }
    }

    function initSiteTheme() {
        if (import.meta.client) {
            currentTheme.value = localStorage.getItem('selectedTheme') || 'light';
            setTheme(currentTheme.value);
        }
    }

    return { initSiteTheme, setTheme, currentTheme };
}
