export function auth(token: string) {
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    return headers;
}
