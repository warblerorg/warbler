export const threadUrl = (threadId: string) => `/v1/comments/${threadId}`;
export const commentUrl = (threadId: string, commentId: number) =>
    `/v1/comments/${threadId}/${commentId}`;

export const markdownUrl = () => '/v1/markdown/';

export const userUrl = () => '/v1/user';
export const loginUrl = () => '/v1/user/login';
export const logoutUrl = () => '/v1/user/logout';
