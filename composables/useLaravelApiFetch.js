export const useLaravelApiFetch = (request, opts) => {
    const config = useRuntimeConfig();
    return useFetch(request, { baseURL: config.public.laravelApiBase, ...opts });
};
