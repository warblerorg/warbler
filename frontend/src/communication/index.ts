import { CommentsArray } from './schemas';
import { threadUrl, commentUrl, markdownUrl } from './urls';
import { warbleFetch } from './utils';

type StringRecord = Record<string, string>;

const text = (res: Response) => res.text();
const json = (res: Response) => res.json();

/**
 * Find comments for a thread
 */
export function getComments(
    server: string,
    threadId: string,
    query?: { sort?: 'asc' | 'desc'; max_depth?: string },
): Promise<{ comments: CommentsArray; total: number }> {
    const queryString = query
        ? `?${new URLSearchParams(query as StringRecord)}`
        : '';
    return warbleFetch(server + threadUrl(threadId) + queryString).then(json);
}

/**
 * Add a new comment to the thread
 */
export function addComment(
    server: string,
    threadId: string,
    content: string,
    parent_id?: number,
): Promise<Comment> {
    return warbleFetch(server + threadUrl(threadId), {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, parent_id }),
    }).then(json);
}

/**
 * Get a single comment sub-tree in the thread
 */
export function getComment(
    server: string,
    threadId: string,
    commentId: number,
    query?: { sort?: 'asc' | 'desc'; max_depth?: string },
): Promise<Comment> {
    const queryString = query
        ? `?${new URLSearchParams(query as StringRecord)}`
        : '';
    return warbleFetch(
        server + commentUrl(threadId, commentId) + queryString,
    ).then(json);
}

/**
 * Update a comment in the thread
 */
export function updateComment(
    server: string,
    threadId: string,
    commentId: number,
    newContent: string,
): Promise<Comment> {
    return warbleFetch(server + commentUrl(threadId, commentId), {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newContent }),
    }).then(json);
}

/**
 * Delete a comment in the thread
 */
export function deleteComment(
    server: string,
    threadId: string,
    commentId: number,
): Promise<Comment> {
    return warbleFetch(server + commentUrl(threadId, commentId), {
        method: 'delete',
    }).then(json);
}

/**
 * Render markdown as HTML
 */
export function previewMarkdown(
    server: string,
    content: string,
): Promise<string> {
    return warbleFetch(server + markdownUrl(), {
        method: 'post',
        headers: { 'Content-Type': 'text/plain' },
        body: content,
    }).then(text);
}
