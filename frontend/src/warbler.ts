// import { getComments } from './communication/get-comments';
import { replyAction } from './elements/action';
import { allComments } from './elements/all-comments';
import { comment } from './elements/comment';
import { appendChildren } from './elements/dom';
import { Comment } from './communication/types';

export interface WarblerOptions {
    threadId: string;
    server: string;
}

export interface Warbler {
    element: HTMLElement;
    done: Promise<void>;
}

async function getComments(server: any, threadId: string): Promise<Comment[]> {
    return [
        {
            thread_id: threadId,
            comment_id: '1',
            parent_id: null,
            author: {},
            content: 'Hello gal!',
        },
        {
            thread_id: threadId,
            comment_id: '1',
            parent_id: null,
            author: {},
            content: 'Hello gal!',
        },
        {
            thread_id: threadId,
            comment_id: '1',
            parent_id: null,
            author: {},
            content: 'Hello gal!',
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
