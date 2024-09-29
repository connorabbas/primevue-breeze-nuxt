export default defineNuxtPlugin({
    name: 'app',
    enforce: 'default',
    parallel: true,
    async setup(nuxtApp) {
        const { setTheme, currentTheme } = useTheme();
        setTheme(currentTheme.value);
    },
});
