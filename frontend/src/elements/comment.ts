import { h, ChildType } from './dom';
import { avatar } from './avatar';

export interface CommentProps {
    avatar?: string;
    author?: string;
    authorHref?: string;
    metadata?: ChildType;
    text?: ChildType;
    actions?: ChildType;
    children?: ChildType;
}

/**
 * Display a comment which can contain other nested comments.
 *
 * <article class="yacs-comment">
 *   <div class="yacs-comment__main">
 *     <a class="yacs-avatar">
 *       <img class="yacs-avatar__img" src="">
 *     </a>
 *     <div class="yacs-comment__content">
 *       <a class="yacs-comment__author">{{author}}</a>
 *       <small class="yacs-comment__metadata">{{metadata}}</small>
 *       <div class="yacs-comment__text">{{text}}</div>
 *       <small class="yacs-comment__actions">{{actions}}</small>
 *     </div>
 *   </div>
 *   {{children}}
 * </article>
 */
export function comment(props: CommentProps) {
    const author = h('a', { className: 'yacs-comment__author' }, props.author);
    if (props.authorHref != null) author.href = props.authorHref;

    return h(
        'article',
        { className: 'yacs-comment' },
        h(
            'div',
            { className: 'yacs-comment__main' },
            avatar(props),
            h(
                'div',
                { className: 'yacs-comment__content' },
                author,
                h(
                    'small',
                    { className: 'yacs-comment__metadata' },
                    props.metadata,
                ),
                h('div', { className: 'yacs-comment__text' }, props.text),
                h(
                    'small',
                    { className: 'yacs-comment__actions' },
                    props.actions,
                ),
            ),
        ),
        props.children,
    );
}
