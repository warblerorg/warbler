// import { getComments } from './communication/get-comments';
import { Author, CommentsArray } from './communication/schemas';
import { submitButton } from './elements';
import { h } from './elements/dom';
import { handleReplyClick } from './listeners/reply-action';
import { renderComments } from './render/render-comments';

export interface WarblerOptions {
    threadId: string;
    server: string;
}

export interface Warbler {
    element: HTMLElement;
    done: Promise<void>;
}

async function getComments(
    _server: any,
    threadId: string,
): Promise<{ comments: CommentsArray; total: number }> {
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
    return {
        comments: [
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
        ],
        total: 3,
    };
}

export function warbler(options: WarblerOptions): Warbler {
    let { server, threadId } = options;
    const main = h('section', { className: 'warbler' });
    main.dataset.threadId = threadId;
    main.addEventListener(
        'click',
        handleReplyClick({ action: '', submit: () => submitButton({}) }),
    );

    return {
        element: main,
        done: getComments(server, threadId)
            .then(({ total, comments }) => renderComments(total, comments))
            .then(commentElement => {
                main.appendChild(commentElement);
            }),
    };
}
