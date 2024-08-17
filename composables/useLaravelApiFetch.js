export const useLaravelApiFetch = (request, opts = {}) => {
    opts.immediate = false;
    opts.watch = false;
    opts.credentials = 'include';
    opts.headers = {
        accept: 'application/json',
    };
    if (opts?.method && opts.method.toLowerCase() === 'post') {
        opts.headers['X-XSRF-TOKEN'] = useCookie('XSRF-TOKEN');
    }

    return useFetch(request, { baseURL: useRuntimeConfig().public.laravelApiBase, ...opts });
};
