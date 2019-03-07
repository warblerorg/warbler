// import { getComments } from './communication/get-comments';
import { replyAction } from './elements/action';
import { allComments } from './elements/all-comments';
import { comment } from './elements/comment';
import { appendChildren } from './elements/dom';
import { Comment, Author } from './communication/schemas';

export interface WarblerOptions {
    threadId: string;
    server: string;
}

export interface Warbler {
    element: HTMLElement;
    done: Promise<void>;
}

async function getComments(server: any, threadId: string): Promise<Comment[]> {
    const defaults = {
        thread_id: threadId,
        parent_id: -1,
        author_association: 'none' as 'none',
        reactions: [],
        children: [],
    };
    const daphne: Author = {
        avatar_url: '',
        username: 'daphne',
        name: 'Daphne Liu',
        website: '',
    };
    const tiger: Author = {
        avatar_url: '',
        username: 'daphne',
        name: 'Tiger',
        website: '',
    };
    const em: Author = {
        avatar_url: '',
        username: 'daphne',
        name: 'Em',
        website: '',
    };
    return [
        {
            ...defaults,
            comment_id: 1,
            author: daphne,
            content: 'Hello World!',
            created_at: '2019-03-07T06:09:37.219Z',
            updated_at: '2019-03-07T06:09:37.219Z',
            children: [
                {
                    ...defaults,
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
            comment_id: 3,
            author: em,
            content: 'Welcome to warbler.',
            created_at: '2019-03-07T06:09:37.219Z',
            updated_at: '2019-03-07T07:09:37.219Z',
        },
    ];
}

export function warbler(options: WarblerOptions): Warbler {
    let { server, threadId } = options;
    const element = allComments({ count: null, threadId });

    return {
        element,
        done: getComments(server, threadId)
            .then(commentsData =>
                commentsData.map(commentData =>
                    comment({
                        commentId: commentData.comment_id,
                        avatar: commentData.author.avatar_url,
                        author: commentData.author.name,
                        authorHref: commentData.author.website,
                        text: commentData.content,
                        actions: replyAction({}),
                    }),
                ),
            )
            .then(commentElements => {
                appendChildren(element, commentElements);
            }),
    };
}
