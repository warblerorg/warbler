import { Comment, CommentsArray, Author } from './schemas';

const defaults = {
    parent_id: -1,
    author_association: 'none' as 'none',
    reactions: [],
    children: [],
};
const daphne: Author = {
    avatar_url: '',
    username: 'daphne',
    name: 'Daphne Liu',
    website: null,
};
const tiger: Author = {
    avatar_url: '',
    username: 'daphne',
    name: 'Tiger',
    website: 'https://tigeroakes.com',
};
const em: Author = {
    avatar_url: '',
    username: 'daphne',
    name: 'Em',
    website: null,
};

export async function getComments(
    server: string,
    threadId: string,
    query?: { sort?: 'asc' | 'desc'; max_depth?: string }
): Promise<{ comments: CommentsArray; total: number }> {
    return {
        comments: [
            {
                ...defaults,
                thread_id: threadId,
                comment_id: 1,
                author: daphne,
                content: 'Hello World!',
                created_at: '2019-03-07T06:09:37.219Z',
                updated_at: '2019-03-07T06:09:37.219Z',
                children: [
                    {
                        ...defaults,
                        thread_id: threadId,
                        comment_id: 2,
                        author: tiger,
                        content: 'Hello gal!',
                        created_at: '2019-03-07T06:09:37.219Z',
                        updated_at: '2019-03-07T06:10:37.219Z',
                    },
                ],
            },
            {
                ...defaults,
                thread_id: threadId,
                comment_id: 3,
                author: em,
                content: 'Welcome to warbler.',
                created_at: '2019-03-07T06:09:37.219Z',
                updated_at: '2019-03-07T07:09:37.219Z',
                reactions: [
                    { emoji: '🙂', count: 1, viewer_has_reacted: false },
                ],
            },
        ],
        total: 3,
    };
}

/**
 * Add a new comment to the thread
 */
export async function addComment(
    server: string,
    threadId: string,
    content: string,
    parent_id?: number
): Promise<Comment> {
    return {
        ...defaults,
        thread_id: threadId,
        parent_id: parent_id != null ? parent_id : defaults.parent_id,
        comment_id: 2,
        author: tiger,
        content: 'Hello gal!',
        created_at: '2019-03-07T06:09:37.219Z',
        updated_at: '2019-03-07T06:10:37.219Z',
    };
}

/**
 * Get a single comment sub-tree in the thread
 */
export async function getComment(
    server: string,
    threadId: string,
    commentId: number,
    query?: { sort?: 'asc' | 'desc'; max_depth?: string }
): Promise<Comment> {
    return {
        ...defaults,
        thread_id: threadId,
        comment_id: commentId,
        author: tiger,
        content: 'Hello gal!',
        created_at: '2019-03-07T06:09:37.219Z',
        updated_at: '2019-03-07T06:10:37.219Z',
    };
}

/**
 * Update a comment in the thread
 */
export async function updateComment(
    server: string,
    threadId: string,
    commentId: number,
    newContent: string
): Promise<Comment> {
    return {
        ...defaults,
        thread_id: threadId,
        comment_id: commentId,
        author: tiger,
        content: 'Hello gal!',
        created_at: '2019-03-07T06:09:37.219Z',
        updated_at: '2019-03-07T06:10:37.219Z',
    };
}

/**
 * Delete a comment in the thread
 */
export async function deleteComment(
    server: string,
    threadId: string,
    commentId: number
): Promise<Comment> {
    return {
        ...defaults,
        thread_id: threadId,
        comment_id: commentId,
        author: tiger,
        content: 'Hello gal!',
        created_at: '2019-03-07T06:09:37.219Z',
        updated_at: '2019-03-07T06:10:37.219Z',
    };
}

/**
 * Render markdown as HTML
 */
export async function previewMarkdown(
    server: string,
    content: string
): Promise<string> {
    return '';
}
