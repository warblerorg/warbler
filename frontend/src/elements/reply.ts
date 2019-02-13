import { h, ChildType } from './dom';
import { avatar } from './avatar';

export interface ReplyProps {
    avatar?: string;
    authorHref?: string;
    children?: ChildType;
}

/**
 * Let the user input their reply as a new comment.
 *
 * <form class="yacs-comment yacs-reply">
 *   <div class="yacs-comment__main">
 *     <a class="yacs-avatar">
 *       <img class="yacs-avatar__img" src="">
 *     </a>
 *     <div class="yacs-comment__content">
 *       <textarea class="yacs-reply__input" name="reply" required>
 *       {{children}}
 *     </div>
 *   </div>
 * </form>
 */
export function reply(props: ReplyProps) {
    const textarea = h('textarea', {
        className: 'yacs-reply__input',
        name: 'reply',
        required: true,
    });
    textarea.setAttribute('aria-label', 'Reply');

    return h(
        'form',
        { className: 'yacs-comment yacs-reply' },
        h(
            'div',
            { className: 'yacs-comment__main' },
            avatar(props),
            h(
                'div',
                { className: 'yacs-comment__content' },
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
 * <button class="yacs-reply__submit" type="submit">
 *   Add reply
 * </button>
 */
export function submitButton({ children = 'Add reply' }: SubmitButtonProps) {
    return h(
        'button',
        { className: 'yacs-reply__submit', type: 'submit' },
        children,
    );
}