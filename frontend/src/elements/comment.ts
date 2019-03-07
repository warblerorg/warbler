import { h, ChildType } from './dom';
import { avatar } from './avatar';
import { Sanitizer } from '../communication/sanitize';

export interface CommentProps {
    avatar?: string;
    author?: string;
    authorHref?: string;
    commentId: string;
    metadata?: ChildType;
    text: string;
    actions?: ChildType;
    children?: ChildType;
}

const sanitizer = new Sanitizer();

/**
 * Display a comment which can contain other nested comments.
 *
 * <article class="warbler-comment">
 *   <div class="warbler-comment__main">
 *     <a class="warbler-avatar">
 *       <img class="warbler-avatar__img" src="">
 *     </a>
 *     <div class="warbler-comment__content">
 *       <a class="warbler-comment__author">{{author}}</a>
 *       <small class="warbler-comment__metadata">{{metadata}}</small>
 *       <div class="warbler-comment__text">{{text}}</div>
 *       <small class="warbler-comment__actions">{{actions}}</small>
 *     </div>
 *   </div>
 *   {{children}}
 * </article>
 */
export function comment(props: CommentProps) {
    const author = h(
        'a',
        { className: 'warbler-comment__author' },
        props.author,
    );
    if (props.authorHref != null) author.href = props.authorHref;

    return h(
        'article',
        {
            className: 'warbler-comment',
            id: `warbler-comment-${props.commentId}`,
        },
        h(
            'div',
            { className: 'warbler-comment__main' },
            avatar(props),
            h(
                'div',
                { className: 'warbler-comment__content' },
                author,
                h(
                    'small',
                    { className: 'warbler-comment__metadata' },
                    props.metadata,
                ),
                h(
                    'div',
                    { className: 'warbler-comment__text' },
                    sanitizer.sanitize(props.text),
                ),
                h(
                    'small',
                    { className: 'warbler-comment__actions' },
                    props.actions,
                ),
            ),
        ),
        props.children,
    );
}
