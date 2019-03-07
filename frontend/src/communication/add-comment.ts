import { threadUrl } from './urls';
import { NewComment } from './types';
import { auth } from './auth-header';

interface AddCommentOptions {
    server: string;
    token: string;

    threadId: string;
    body: FormData | NewComment;
    contentType: string;
}

/**
 * POSTs the given reply data to the server.
 * @param action URL to post to.
 * @param formData Data to submit to the server. Build with
 * `new FormData(formElement)`. Should include a `"message"` key with the
 * message to send. May optionally include a `"parent"` ID with another
 * comment ID to reply to.
 * @param authToken JSON Web Token used to authorize the logged in user.
 */
export function addComment(options: AddCommentOptions) {
    let body: BodyInit;
    const headers = auth(options.token);
    if (options.body instanceof FormData) {
        body = options.body;
    } else {
        body = JSON.stringify(options.body);
        headers.append('Content-Type', 'application/json');
    }
    return fetch(options.server + threadUrl(options.threadId), {
        method: 'POST',
        headers,
        body,
    }).then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    });
}
