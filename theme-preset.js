import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

const customThemePreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{green.50}',
            100: '{green.100}',
            200: '{green.200}',
            300: '{green.300}',
            400: '{green.400}',
            500: '{green.500}',
            600: '{green.600}',
            700: '{green.700}',
            800: '{green.800}',
            900: '{green.900}',
            950: '{green.950}',
        },
        colorScheme: {
            light: {
                surface: {
                    50: '{gray.50}',
                    100: '{gray.100}',
                    200: '{gray.200}',
                    300: '{gray.300}',
                    400: '{gray.400}',
                    500: '{gray.500}',
                    600: '{gray.600}',
                    700: '{gray.700}',
                    800: '{gray.800}',
                    900: '{gray.900}',
                    950: '{gray.950}',
                },
            },
            dark: {
                surface: {
                    50: '{gray.50}',
                    100: '{gray.100}',
                    200: '{gray.200}',
                    300: '{gray.300}',
                    400: '{gray.400}',
                    500: '{gray.500}',
                    600: '{gray.600}',
                    700: '{gray.700}',
                    800: '{gray.800}',
                    900: '{gray.900}',
                    950: '{gray.950}',
                },
            },
        },
    },
});

export default {
    preset: customThemePreset,
    options: {
        darkModeSelector: '.dark-mode',
        // causing delayed component styling from Tailwind base (preflight) styles
        // use ! prefix on utility classes for now for higher specificity
        /* cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities',
        }, */
    },
};
