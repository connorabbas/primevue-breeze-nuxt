export const useLaravelApiFetch = (request, opts) => {
    const config = useRuntimeConfig();
    opts.credentials = 'include';
    opts.headers = {
        accept: 'application/json',
    };
    if (opts?.method && opts.method.toLowerCase() === 'post') {
        opts.headers['X-XSRF-TOKEN'] = useCookie('XSRF-TOKEN');
    }

    return useFetch(request, { baseURL: config.public.laravelApiBase, ...opts });
};
