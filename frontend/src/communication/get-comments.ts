import { newlineDelimitedJsonStream, newlineDelimitedJson } from './ndjson';
import { Comment } from './types';
import { threadUrl } from './urls';

export function getComments(server: string, threadId: string) {
    return fetch(server + threadUrl(threadId)).then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json() as Promise<Comment[]>;
    });
}

export function streamComments(
    server: string,
    threadId: string,
    callback: (comment: Comment) => void,
) {
    return fetch(server + threadUrl(threadId)).then(response => {
        // Throw if a non-200 response is received
        if (!response.ok) throw new Error(response.statusText);

        if (response.body) {
            // Use streaming if supported
            return newlineDelimitedJsonStream(response.body, callback);
        } else {
            return response
                .text()
                .then(data => newlineDelimitedJson(data, callback));
        }
    });
}
