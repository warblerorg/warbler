export const threadUrl = (threadId: string) =>
    `/v1/thread/${threadId}/comments/`;
export const commentUrl = (threadId: string, commentId: number) =>
    `/v1/thread/${threadId}/comments/${commentId}`;

export const markdownUrl = () => '/v1/markdown/';

export const userUrl = () => '/v1/user';
export const loginUrl = () => '/v1/user/login';
export const logoutUrl = () => '/v1/user/logout';
