/**
 * Small wrapper around `fetch()` that adds the Authorization token and rejects
 * if HTTP errors are encountered.
 */
export function warbleFetch(url: string, options: RequestInit = {}) {
    return Promise.resolve('TODO_AUTH') // TODO auth token
        .then(token => {
            // Add auth to request headers
            const headers = new Headers(options.headers);
            headers.append('Authorization', `Bearer ${token}`);
            // Make the fetch
            return fetch(url, {
                ...options,
                headers,
            });
        })
        .then(checkForHttpErrors);
}

/**
 * Check for any HTTP errors, and throw if one is encountered.
 * Use as a callback for `fetch` to seamlessly add HTTP error checking to your code.
 * @param {Response} response
 * @example
 * fetch('https://example.com')
 *   .then(checkForHttpErrors)
 *   .then(res => res.json())
 *   .catch(err => {
 *      // process network error or HTTP error
 *   });
 */
export function checkForHttpErrors(response: Response) {
    if (response.ok) return response;
    else throw new HttpError(response);
}

class HttpError extends Error {
    readonly response: Response;
    readonly status: number;

    /**
     * @param {Response} response
     */
    constructor(response: Response) {
        super(response.statusText);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }

        this.response = response;
        this.status = response.status;
    }
}
