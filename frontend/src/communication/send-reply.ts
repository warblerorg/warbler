/**
 * POSTs the given reply data to the server.
 * @param action URL to post to.
 * @param formData Data to submit to the server. Build with
 * `new FormData(formElement)`. Should include a `"message"` key with the
 * message to send. May optionally include a `"parent"` ID with another
 * comment ID to reply to.
 * @param authToken JSON Web Token used to authorize the logged in user.
 */
function sendReply(action: string, formData: FormData, authToken: string) {
    return fetch(action, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        body: formData,
    });
}
