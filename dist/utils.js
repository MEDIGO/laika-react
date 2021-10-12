export const DEFAULT_TIMEOUT = 60 * 60 * 1000;
export const timeoutKey = (key) => `${key}_timeout`;
export const store = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(timeoutKey(key), Date.now());
    return value;
};
export const retrieve = (key, retrievalFunction, timeout = DEFAULT_TIMEOUT) => {
    const ts = localStorage.getItem(timeoutKey(key));
    if (!ts || (Date.now() - ts) > timeout) {
        return retrievalFunction()
            .then((response) => store(key, response))
            .catch(() => {
        });
    }
    return JSON.parse(localStorage.getItem(key));
};
export const parse = (res) => {
    if (!res.headers.get('content-type'))
        return null;
    return res.headers.get('content-type').startsWith('application/json') ? res.json() : null;
};
export const getLaikaFeatureStatus = (feature, uri, env) => {
    const opts = {
        method: 'GET',
    };
    const laikaUrl = `${uri}/api/features/${feature}/status/${env}`;
    return fetch(laikaUrl, opts)
        .then((res) => {
        const body = parse(res);
        if (res.status !== 200) {
            return false;
        }
        if (!body)
            return false;
        return body.then((json) => (res.ok ? json : Promise.reject(json)));
    })
        .catch(() => false);
};
export const getFeatureStatus = (feature, uri, env) => Promise.resolve(retrieve(feature, () => getLaikaFeatureStatus(feature, uri, env), 1.5 * 60 * 1000));
