# Nuxt w/ PrimeVue & Laravel Breeze API Stack
A [Nuxt](https://nuxt.com/) & [PrimeVue](https://primevue.org/) starter kit meant for use with a [Laravel Breeze](https://laravel.com/docs/master/starter-kits#laravel-breeze) API stack backend.

An alternative to using my [Inertia](https://github.com/connorabbas/primevue-breeze-inertia) or [Regular Vue SPA](https://github.com/connorabbas/primevue-breeze-spa) starter kits.

## Setup 
1. Clone the repo (or download the zip)
2. Create a new `.env` file in the root directory, reference the `.env.example` file for the vars/values
3. Create a [new Laravel application](https://laravel.com/docs/master/installation) 
4. Install [Laravel Breeze](https://laravel.com/docs/master/starter-kits#laravel-breeze-installation) using the [API Stack](https://laravel.com/docs/master/starter-kits#breeze-and-next) option
5. Setup necessary `.env` configuration values in the Laravel API project
    ```
    # Remember, your SPA and API must share the same top-level domain
    # Example implementation, could also use localhost with different port numbers
    APP_URL="http://breeze-api.test" # Match this value with NUXT_PUBLIC_API_BASE_URL in the Nuxt app .env
    FRONTEND_URL="http://nuxt.breeze-api.test" # Add app.frontend_url config entry as needed
    SANCTUM_STATEFUL_DOMAINS="nuxt.breeze-api.test"
    SESSION_DOMAIN=".breeze-api.test"
    ```

## Theme
This starter kit provides a light/dark mode and custom theme functionality provided by the powerful PrimeVue theming system, using styled mode and custom design token values.

The starting point for customizing your theme will be the `theme-preset.js` file at the root of the project. To quickly change the look and feel of your theme, swap the [primary](https://primevue.org/theming/styled/#primary) values with a different set of [colors](https://primevue.org/theming/styled/#colors), change the [surface](https://primevue.org/theming/styled/#surface) `colorScheme` values (slate, gray, neutral, etc.), or completely change the [preset theme](https://primevue.org/theming/styled/#presets) (Aura used by default).

Please reference the [PrimeVue Styled Mode Docs](https://primevue.org/theming/styled/) to fully understand how this system works, and how to further customize your theme to make it your own.
