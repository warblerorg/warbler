import { h, ChildType } from './dom';
import { avatar } from './avatar';

export interface ReplyProps {
    action: string;
    avatar?: string;
    authorHref?: string;
    children?: ChildType;
    label?: string;
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
        name: 'reply',
        required: true,
    });
    textarea.setAttribute('aria-label', props.label || 'Reply');

    return h(
        'form',
        {
            className: 'warbler-comment warbler-reply',
            action: props.action,
            method: 'POST',
        },
        h(
            'div',
            { className: 'warbler-comment__main warbler-reply__main' },
            avatar(props),
            h(
                'div',
                { className: 'warbler-comment__content warbler-reply__content' },
                textarea,
                props.children,
            ),
        ),
    );
}

interface SubmitButtonProps {
    children?: ChildType;
}

/**
 * Button to submit a reply. Use as child for `reply` if a user is logged in.
 *
 * <button class="warbler-reply__submit" type="submit">
 *   Add reply
 * </button>
 */
export function submitButton({ children = 'Add reply' }: SubmitButtonProps) {
    return h(
        'button',
        { className: 'warbler-reply__submit', type: 'submit' },
        children,
    );
}
