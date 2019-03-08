import { h, ChildType } from './dom';
import { avatar } from './avatar';
import { handleReplySubmit } from '../listeners/submit-action';
import { threadUrl } from '../communication/urls';

export interface ReplyProps {
    server: string;
    avatar?: string;
    authorHref?: string;
    children?: ChildType;
    label?: string;
    parentId?: string;
    threadId: string;
}

/**
 * Let the user input their reply as a new comment.
 *
 * <form class="warbler-comment warbler-reply">
 *   <div class="warbler-comment__main">
 *     <a class="warbler-avatar">
 *       <img class="warbler-avatar__img" src="">
 *     </a>
 *     <div class="warbler-comment__content">
 *       <textarea class="warbler-reply__input" name="reply" required>
 *       {{children}}
 *     </div>
 *   </div>
 * </form>
 */
export function reply(props: ReplyProps) {
    const textarea = h('textarea', {
        className: 'warbler-reply__input',
        name: 'content',
        required: true,
    });
    textarea.setAttribute('aria-label', props.label || 'Reply');

    const form = h(
        'form',
        {
            className: 'warbler-comment warbler-reply',
            action: props.server + threadUrl(props.threadId),
            method: 'post',
        },
        props.parentId
            ? h('input', {
                  type: 'hidden',
                  name: 'parent_id',
                  value: props.parentId,
              })
            : null,
        h('input', {
            type: 'hidden',
            name: 'thread_id',
            value: props.threadId,
        }),
        h(
            'div',
            { className: 'warbler-comment__main warbler-reply__main' },
            avatar(props),
            h(
                'div',
                {
                    className:
                        'warbler-comment__content warbler-reply__content',
                },
                textarea,
                props.children,
            ),
        ),
    );

    form.addEventListener('submit', handleReplySubmit(props.server));

    return form;
}

/**
 * Button to submit a reply. Use as child for `reply` if a user is logged in.
 *
 * <button class="warbler-reply__submit" type="submit">
 *   Add reply
 * </button>
 */
export function submitButton() {
    return h(
        'button',
        { className: 'warbler-reply__submit', type: 'submit' },
        'Add reply',
    );
}
