import { getComments } from './communication/mock';
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

export function warbler(options: WarblerOptions): Warbler {
    let { server, threadId } = options;
    const main = h('section', { className: 'warbler' });
    main.dataset.threadId = threadId;

    main.addEventListener(
        'click',
        handleReplyClick({ server, submit: () => submitButton(), threadId })
    );

    return {
        element: main,
        done: getComments(server, threadId)
            .then(({ total, comments }) =>
                renderComments(server, threadId, total, comments)
            )
            .then(commentElement => {
                main.appendChild(commentElement);
            }),
    };
}
